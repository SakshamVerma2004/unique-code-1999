import { useContext, useEffect, useState } from "react";
import styles from "./IndiviualCategory.module.css";
import { useParams } from "react-router-dom";
import Navbar from "..//Components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer.jsx";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Location from "../Components/Location";
import delivery from "..//Components/Assets/delivery-truck.png";
import { AuthContext } from "../Context/AuthContextProvider";
import swal from "sweetalert";
import animal from "../Components/Assets/animal-3629.gif";
let IndiviualCategory = () => {
  let [confirmLogout, setConfirmLogout] = useState(false);
  let [addedToCart, setAddedToCart] = useState(false);
  let [monthsValue, setMonthsValue] = useState(3);
  let [showLogin, setShowLogin] = useState(false);
  let [showSignup, setShowSignup] = useState(false);
  let {
    isLogin,
    setIsLogin,
    loginName,
    loginEmail,
    showCity,
    setShowCity,
    selectedCity,
    showProfile,
    setShowProfile,
  } = useContext(AuthContext);
  let [quickViewData, setQuickViewData] = useState(null);
  let [selectedCard, setSelectedCard] = useState(null);
  let [searchQuery, setSearchQuery] = useState("");
  let [originalData, setOriginalData] = useState([]);
  let [sortOrder, setSortOrder] = useState("");
  let navigate = useNavigate();
  let [hoveredCard, setHoveredCard] = useState(false);
  let [submitted, setSubmitted] = useState(false);
  let [submitDis, setSubmitDis] = useState(false);
  let [data, setData] = useState([]);
  let { category } = useParams();
  let [isSorted, setIsSorted] = useState(false);
  let [showQuickView, setShowQuickView] = useState(false);
  let [suggestionValue, setSuggestionValue] = useState("");
  let [total, setTotal] = useState(1);
  let [showTotal, setShowTotal] = useState();
  let setMonths = (discount) => {
    let newRent = quickViewData.monthly_rent * (1 - discount);
    setTotal(newRent);
    setShowTotal(newRent.toFixed(0));
  };
  let cartNavigator = () => {
    navigate("/cart");
  };
  let confirmLogoutHandler = () => {
    setShowProfile(false);
    setConfirmLogout(true);
  };
  let hideConfirmLogout = () => {
    setConfirmLogout(false);
  };
  let hideLoginHandlerForYes = () => {
    setIsLogin(false);
    setConfirmLogout(false);
  };
  useEffect(() => {
    if (showLogin || showSignup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLogin, showSignup]);
  let showLoginHandler = () => {
    setShowLogin(true);
  };
  let showSignupHandler = () => {
    setShowSignup(true);
  };
  let hideSignupHandler = () => {
    setShowSignup(false);
  };
  let showLoginAndHideSignup = () => {
    setShowSignup(false);
    setShowLogin(true);
  };
  let showSignupAndHideLogin = () => {
    setShowLogin(false);
    setShowSignup(true);
  };
  let hideLoginHandler = () => {
    setShowLogin(false);
  };
  useEffect(() => {
    if (quickViewData) {
      setShowTotal(quickViewData.monthly_rent);
    }
  }, [quickViewData]);
  useEffect(() => {
    if (showQuickView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showQuickView]);
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/all_products.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let filteredData = data.filter((item) => {
          return (
            item.category === category &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
        setOriginalData(filteredData);
        if (isSorted) {
          if (sortOrder === "asc") {
            filteredData.sort((a, b) => a.monthly_rent - b.monthly_rent);
          } else if (sortOrder === "desc") {
            filteredData.sort((a, b) => b.monthly_rent - a.monthly_rent);
          } else if (sortOrder === "refundable-asc") {
            filteredData.sort(
              (a, b) => a.refundable_deposit - b.refundable_deposit
            );
          } else if (sortOrder === "refundable-desc") {
            filteredData.sort(
              (a, b) => b.refundable_deposit - a.refundable_deposit
            );
          }
        }
        setData(filteredData);
      });
  }, [category, sortOrder, isSorted, searchQuery]);
  let suggestionSubmitHandler = () => {
    if (suggestionValue.trim().length < 3) {
      setSubmitDis(true);
      return;
    }
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/extra.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_DAY_MM_DD_YY: new Date().toDateString(),
        time_HH_MM_SS: new Date().toLocaleTimeString(),
        Username: loginName,
        Email: loginEmail,
        Suggestion: suggestionValue,
      }),
    }).then((res) => {
      setSubmitted(true);
      return res.json();
    });
  };
  let handleNavigate = (index) => {
    setQuickViewData(data[index]);
    setShowQuickView(true);
    setSelectedCard(index);
  };
  let handleCardNavigate = (category, name) => {
    navigate(`/${category}/${name}`);
  };
  let handleShowCity = () => {
    if (selectedCity) {
      setShowCity(!showCity);
    }
  };
  useEffect(() => {
    if (showCity || showLogin || showSignup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showCity, showLogin, showSignup]);
  useEffect(() => {
    if (showQuickView) {
      fetch("https://rento-mojo-default-rtdb.firebaseio.com/cart.json")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let cartData = Object.values(data);
          for (let i = 0; i < cartData.length; i++) {
            if (
              loginName === cartData[i].Username &&
              loginEmail === cartData[i].Email &&
              quickViewData.name === cartData[i].Item_Name
            ) {
              setAddedToCart(true);
            } else {
              setAddedToCart(false);
            }
          }
        });
    }
  }, [showQuickView, quickViewData]);
  let cartHandler = () => {
    if (!isLogin) {
      swal(
        "Pending Login",
        "You need to Login first to add items in cart",
        "error"
      );
      return;
    }
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/cart.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_DAY_MM_DD_YY: new Date().toDateString(),
        time_HH_MM_SS: new Date().toLocaleTimeString(),
        Item_Name: quickViewData.name,
        Item_Image: quickViewData.image,
        Item_Desc: quickViewData.desc,
        Item_Monthly_Rent: quickViewData.monthly_rent,
        Item_Refundable_Deposit: quickViewData.refundable_deposit,
        Delivery_To_Which_City: selectedCity,
        Username: loginName,
        Email: loginEmail,
      }),
    }).then((res) => {
      swal(`${quickViewData.name}`, "Product added to Cart", "success");
      cartNavigator();
      return res.json();
    });
  };
  return (
    <div className={styles.main}>
      <Navbar
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        onShow={handleShowCity}
        onLogin={showLoginHandler}
        onSignup={showSignupHandler}
      />
      {showProfile ? (
        <div className={styles.profileDiv}>
          <div className={styles.profileNameDiv}>
            <p className={styles.profileName}>Name :-{loginName}</p>
            <p
              className={styles.cancelProfile}
              onClick={() => setShowProfile(false)}
            >
              ✕
            </p>
          </div>
          <p className={styles.profileName}>Email :-{loginEmail}</p>
          <div className={styles.logoutDiv}>
            <button className={styles.logoutBtn} onClick={confirmLogoutHandler}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {confirmLogout ? (
        <div className={styles.confirmLogoutDiv}>
          <div className={styles.logoutImageDiv}>
            <img
              className={styles.logoutImage}
              alt="logout-image"
              src={animal}
            />
          </div>
          <div className={styles.logoutInfoDiv}>
            <p className={styles.logoutHeading}>
              Are you sure you want to logout ?
            </p>
            <div className={styles.logoutButtonDiv}>
              <button
                className={styles.yesLogoutBtn}
                onClick={hideLoginHandlerForYes}
              >
                Yes
              </button>
              <button
                className={styles.noLogoutBtn}
                onClick={hideConfirmLogout}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.categoryDiv}>
        <p className={styles.category}>{category}</p>
        <p className={styles.cancel} onClick={() => navigate("/")}>
          ✕
        </p>
      </div>
      {showCity && (
        <div className={styles.locationOverlay}>
          <Location />
        </div>
      )}
      <div className={styles.flexDiv}>
        <div className={styles.filterDiv}>
          <div className={styles.rentDiv}>
            <p className={styles.rentHeading}>
              Renting available for following months as tenure
            </p>
            <div className={styles.rentButtonDiv}>
              <button className={styles.rentButton}>3 +</button>
              <button className={styles.rentButton}>6 +</button>
              <button className={styles.rentButton}>12 +</button>
            </div>
          </div>
          <div className={styles.sortDiv}>
            <div className={styles.sortHeadingDiv}>
              <p className={styles.sortHeading}>Sort by :-</p>
              <button
                className={styles.resetButton}
                onClick={() => {
                  setData(originalData);
                  setIsSorted(false);
                }}
              >
                Reset
              </button>
            </div>
            <button
              className={styles.sortButton}
              onClick={() => {
                setSortOrder("asc");
                setIsSorted(true);
              }}
            >
              Monthly Rent in Asc
            </button>
            <button
              className={styles.sortButton}
              onClick={() => {
                setSortOrder("desc");
                setIsSorted(true);
              }}
            >
              Monthly Rent in Desc
            </button>
            <button
              className={styles.sortButton}
              onClick={() => {
                setSortOrder("refundable-asc");
                setIsSorted(true);
              }}
            >
              Refundable Deposit in Asc
            </button>
            <button
              className={styles.sortButton}
              onClick={() => {
                setSortOrder("refundable-desc");
                setIsSorted(true);
              }}
            >
              Refundable Deposit in Desc
            </button>
          </div>
          <div
            className={
              showQuickView ? styles.suggestionDiv : styles.notSuggestionDiv
            }
          >
            <p className={styles.suggestionHeading}>
              What do you want us to launch next ?
            </p>
            <p className={styles.suggestionDesc}>Suggest us a product</p>
            <div className={styles.suggestionInputDiv}>
              <input
                className={
                  showQuickView
                    ? styles.suggestionInput
                    : styles.notSuggestionInput
                }
                placeholder="Your suggestion"
                type="text"
                value={suggestionValue}
                onChange={(e) => setSuggestionValue(e.target.value)}
              />
              <button
                className={showQuickView ? styles.submit : styles.notSubmit}
                disabled={
                  suggestionValue.trim().length < 3 || !isLogin || submitted
                }
                onClick={suggestionSubmitHandler}
              >
                {submitted ? "Submitted" : "Submit"}
              </button>
            </div>
            {!isLogin ? (
              <p className={styles.doLoginText}>
                You need to Login first to give a suggestion .
              </p>
            ) : (
              ""
            )}
            {submitted ? (
              <p className={styles.thanks}>
                Thanks for giving us your suggestion . We will positively look
                into this.
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.productDiv}>
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item, index) => {
              return (
                <div
                  className={styles.card}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img
                    className={showQuickView ? styles.image : styles.notImage}
                    alt="product-image"
                    src={item.image}
                    onClick={() => handleCardNavigate(item.category, item.name)}
                  />
                  <div
                    className={styles.nameDiv}
                    onClick={() => handleCardNavigate(item.category, item.name)}
                  >
                    <p className={styles.name}>{item.name}</p>
                  </div>
                  <div
                    className={styles.infoDiv}
                    onClick={() => handleCardNavigate(item.category, item.name)}
                  >
                    <p className={styles.price}>
                      ₹{" "}
                      <span className={styles.monthly_rent}>
                        {item.monthly_rent}
                      </span>{" "}
                      / mo
                    </p>
                    <div
                      className={styles.deliveryDiv}
                      onClick={() =>
                        handleCardNavigate(item.category, item.name)
                      }
                    >
                      <img
                        className={styles.deliveryImage}
                        alt="delivery-truck"
                        src={delivery}
                      />
                      <p className={styles.deliveryTime}>
                        {item.delivery_in_days} days
                      </p>
                    </div>
                  </div>
                  {hoveredCard !== index && (
                    <div className={styles.availableDiv}>
                      <p className={styles.availableHeading}>
                        Rented Out For - 3 , 6 ,12 months
                      </p>
                    </div>
                  )}
                  {hoveredCard === index && (
                    <div className={styles.quickDiv}>
                      <button
                        className={styles.quickBtn}
                        onClick={() => handleNavigate(index)}
                      >
                        Quick View
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {showQuickView && quickViewData && (
        <div className={styles.quickViewCardDiv}>
          <div className={styles.quickViewCardImageDiv}>
            <img
              className={styles.quickViewImage}
              alt="quick-view-image"
              src={quickViewData.image}
            />
          </div>
          <div className={styles.quickViewDetailsDiv}>
            <p
              className={styles.cancelBtn}
              onClick={() => setShowQuickView(false)}
            >
              ✕
            </p>
            <p className={styles.quickViewHeading}>{quickViewData.name}</p>
            <div className={styles.tenureDiv}>
              <p className={styles.tenureHeading}>Tenure (in Months)</p>
              <div className={styles.tenureButtonDiv}>
                <button
                  className={styles.tenureButton}
                  onClick={() => {
                    setMonths(0);
                    setMonthsValue(3);
                  }}
                >
                  3 +
                </button>
                <button
                  className={styles.tenureButton}
                  onClick={() => {
                    setMonths(0.25);
                    setMonthsValue(6);
                  }}
                >
                  6 +
                </button>
                <button
                  className={styles.tenureButton}
                  onClick={() => {
                    setMonths(0.4);
                    setMonthsValue(12);
                  }}
                >
                  12 +
                </button>
              </div>
            </div>
            <div className={styles.quickPricesDiv}>
              <div className={styles.quickPrices}>
                <p className={styles.quickPriceHeading}>Deposit</p>
                <p className={styles.quickPriceText}>
                  <span className={styles.ruppeeSymbol}>₹</span>{" "}
                  {quickViewData.refundable_deposit}
                </p>
              </div>
              <div className={styles.quickPrices}>
                <p className={styles.quickPriceHeading}>
                  Monthly Rent (For {monthsValue} months)
                </p>
                <p className={styles.quickPriceText}>
                  <span className={styles.ruppeeSymbol}>₹</span> {showTotal}{" "}
                  <span className={styles.ruppeeSymbol}>/ mo</span>
                </p>
              </div>
            </div>
            <div className={styles.quickButtonsDiv}>
              <button
                className={styles.viewDetailsBtn}
                onClick={() =>
                  handleCardNavigate(quickViewData.category, quickViewData.name)
                }
              >
                View Details
              </button>
              {addedToCart ? (
                <button className={styles.addToCartBtn} onClick={cartNavigator}>
                  Already in the Cart
                </button>
              ) : (
                <button className={styles.addToCartBtn} onClick={cartHandler}>
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
      {showLogin ? (
        <Login
          onHide={hideLoginHandler}
          showSignupAndHideLogin={showSignupAndHideLogin}
        />
      ) : (
        ""
      )}
      {showSignup ? (
        <Signup
          showLoginAndHideSignup={showLoginAndHideSignup}
          onHide={hideSignupHandler}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default IndiviualCategory;
