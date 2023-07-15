import Navbar from "../Components/Navbar";
import styles from "./IndiviualProduct.module.css";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import virus from "../Components/Assets/virus.png";
import animal from "../Components/Assets/animal-3629.gif";
import delivery from "..//Components/Assets/delivery-truck.png";
import { AuthContext } from "../Context/AuthContextProvider";
let IndiviualProduct = () => {
  let [confirmLogout, setConfirmLogout] = useState(false);
  let { loginName, loginEmail,showProfile,setShowProfile,isLogin,setIsLogin,selectedCity } = useContext(AuthContext);
  let [already, setAlready] = useState(false);
  let [monthValue, setMonthValue] = useState(3);
  let [showLogin, setShowLogin] = useState(false);
  let [showSignup, setShowSignup] = useState(false);
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let { category, name } = useParams();
  let [features, setFeatures] = useState([]);
  let [recommended, setRecommended] = useState([]);
  let [total, setTotal] = useState(1);
  let [showTotal, setShowTotal] = useState();
  let setMonths = (discount) => {
    let newRent = data.monthly_rent * (1 - discount);
    setTotal(newRent);
    setShowTotal(newRent.toFixed(0));
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
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/all_products.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let filteredData = Object.values(data).filter((item) => {
          return item.category === category && item.name === name;
        });
        if (filteredData.length > 0) {
          setData(filteredData[0]);
          setTotal(filteredData[0].monthly_rent);
          setShowTotal(filteredData[0].monthly_rent.toFixed(0));
          if (filteredData[0].features.length > 0) {
            setFeatures(filteredData[0].features);
          }
        }
      });
  }, []);
  useEffect(() => {
    if (data) {
      document.body.style.overflow = "auto";
    }
  }, [data]);
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
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/all_products.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let filteredData = Object.values(data).filter((item) => {
          return item.category === category && item.name !== name;
        });
        let Data = [];
        for (let i = 0; i < filteredData.length; i = i + 3) {
          Data.push(filteredData[i]);
        }
        setRecommended(Data);
      });
  }, []);
  let navigateToRecommendedPageHandler = (category, name) => {
    navigate(`/${category}/${name}`);
    window.location.reload(true);
  };
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/cart.json")
      .then((res) => res.json())
      .then((cartData) => {
        let cartItems = Object.values(cartData);
        for (let i = 0; i < cartItems.length; i++) {
          if (
            loginName === cartItems[i].Username &&
            loginEmail === cartItems[i].Email &&
            data.name === cartItems[i].Item_Name
          ) {
            setAlready(true);
          } else {
            setAlready(false);
          }
        }
      });
  }, [loginName, loginEmail, data.name, data.desc]);
  let cartHandler = () => {
    if(!isLogin){
      swal("Pending Login","You need to Login first to add items in the cart","error");
      return ;
    }
    if (already) {
      navigate("/cart");
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
        Item_Name: data.name,
        Item_Image: data.image,
        Item_Desc: data.desc,
        Item_Monthly_Rent: data.monthly_rent,
        Item_Refundable_Deposit: data.refundable_deposit,
        Delivery_To_Which_City: selectedCity,
        Username: loginName,
        Email: loginEmail,
      }),
    })
      .then((res) => {
        swal(`${data.name}`, "Product added to Cart", "success");
        navigate("/cart");
        return res.json();
      });
  };
  useEffect(()=>{
    if(showLogin || showSignup ||showProfile || confirmLogout){
      document.body.style.overflow="hidden";
    }
    else{
      document.body.style.overflow="auto";
    }
  },[showLogin,showSignup,showProfile,confirmLogout])
  return (
    <div className={styles.main}>
      <Navbar onLogin={showLoginHandler} onSignup={showSignupHandler} />
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
      <div className={styles.coloredDiv}></div>
      <div className={styles.flexDiv}>
        <div className={styles.ImageDiv}>
          <img
            src={data.image}
            className={styles.image}
            alt="single-product-image"
          />
          <div className={styles.covidDiv}>
            <img className={styles.covidImage} alt="covid-image" src={virus} />
            <p className={styles.covidHeading}>
              Safety precautions during COVID-19. We’re taking additional steps
              and precautionary measures to protect our community from COVID-19.
            </p>
          </div>
          <div className={styles.detailsDiv}>
            <p className={styles.detailsHeading}>Product Details</p>
          </div>
          <div className={styles.sectionDiv}>
            <div className={styles.sectionImgDiv}>
              <img className={styles.sectionImg} alt="image" src={data.image} />
            </div>
            <div className={styles.descDiv}>
              <p className={styles.sectionName}>{data.name}</p>
              <p className={styles.sectionDesc}>{data.desc}</p>
              <p className={styles.featuresHeading}>Features & Specs</p>
              <ul className={styles.unorderedList}>
                {features.map((item) => {
                  return (
                    <li key={item} className={styles.list}>
                      {item}
                    </li>
                  );
                })}
              </ul>
              <p className={styles.materialHeading}>
                Material & Colors {"->"} {data.material_and_color}
              </p>
              <div className={styles.priceDiv}>
                <p className={styles.monthlyPrice}>
                  Monthly Rental :{" "}
                  <span className={styles.price}>₹ {data.monthly_rent}</span>
                </p>
                <p className={styles.monthlyPrice}>
                  Deposit :{" "}
                  <span className={styles.price}>
                    ₹ {data.refundable_deposit}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.recommededDiv}>
            <p className={styles.recommededHeading}>
              You may also like this product(s)
            </p>
            <p className={styles.recommededDesc}>
              Products recommendation based on your search activity
            </p>
            <div className={styles.recommendedCardsDiv}>
              {recommended.map((item) => {
                return (
                  <div
                    className={styles.card}
                    onClick={() =>
                      navigateToRecommendedPageHandler(item.category, item.name)
                    }
                  >
                    <img
                      className={styles.cardImage}
                      alt="recommended-products-image"
                      src={item.image}
                    />
                    <p className={styles.recommendedName}>{item.name}</p>
                    <div className={styles.recommendedInfoDiv}>
                      <div className={styles.recommendedRentDiv}>
                        <p className={styles.recommededRentHeading}>Rent</p>
                        <p className={styles.recommededRent}>
                          ₹ {item.monthly_rent} /mo
                        </p>
                      </div>
                      <div className={styles.checkDiv}>
                        <button
                          className={styles.checkBtn}
                          onClick={() =>
                            navigateToRecommendedPageHandler(
                              item.category,
                              item.name
                            )
                          }
                        >
                          Check Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.infoDiv}>
          <div className={styles.infoHeadingDiv}>
            <p className={styles.infoHeading}>{data.name}</p>
          </div>
          <div className={styles.questionDiv}>
            <p className={styles.question}>
              How long do you want to rent this for? (Months)
            </p>
          </div>
          <div className={styles.btnDiv}>
            <button
              className={styles.months}
              onClick={() => {
                setMonths(0);
                setMonthValue(3);
              }}
            >
              3 +
            </button>
            <button
              className={styles.months}
              onClick={() => {
                setMonths(0.25);
                setMonthValue(6);
              }}
            >
              6 +
            </button>
            <button
              className={styles.months}
              onClick={() => {
                setMonths(0.4);
                setMonthValue(12);
              }}
            >
              12 +
            </button>
          </div>
          <div className={styles.infoPricesDiv}>
            <div className={styles.pricesDiv}>
              <p className={styles.infoPrices}>
                ₹ {showTotal} <span className={styles.nothing}>/mo</span>
              </p>
              <p className={styles.siderole}>
                Monthly Rent (For {monthValue} mo)
              </p>
            </div>
            <div className={styles.pricesDiv}>
              <p className={styles.infoPrices}>₹ {data.refundable_deposit}</p>
              <p className={styles.siderole}>Refundable Deposit</p>
            </div>
          </div>
          <div className={styles.infoDescDiv}>
            <p className={styles.productDesc}>Product Description</p>
            <p className={styles.infoDesc}>{data.desc}</p>
          </div>
          <div className={styles.deliveryDiv}>
            <img
              src={delivery}
              className={styles.deliveryImage}
              alt="delivery-van"
            />
            <p className={styles.deliveryText}>
              Delivery in {data.delivery_in_days} days post KYC
            </p>
          </div>
          <div className={styles.planDiv} onClick={cartHandler}>
            <p className={styles.book}>
              {already ? "Already in the Cart" : "Book Your Plan"}
            </p>
          </div>
        </div>
      </div>
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
export default IndiviualProduct;
