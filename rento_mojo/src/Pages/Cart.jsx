import Navbar from "../Components/Navbar";
import { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { AuthContext } from "../Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Checkout from "../Components/Checkout";
let Cart = () => {
  let closeCheckoutHandler=()=>{
    setShowCheckout(false);
  }
  let navigate = useNavigate();
  let [showCheckout, setShowCheckout] = useState(false);
  let [showCartDiv, setShowCartDiv] = useState(false);
  let [data, setData] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");
  let { isLogin, loginName, loginEmail, total, setTotal } =
    useContext(AuthContext);
  let [showLogin, setShowLogin] = useState(false);
  let [showSignup, setShowSignup] = useState(false);

  let handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  let filteredData = data.filter((item) =>
    item.Item_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    if (showLogin || showSignup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLogin, showSignup]);

  useEffect(() => {
    let totalAmt = 0;
    for (let i = 0; i < filteredData.length; i++) {
      totalAmt = totalAmt + filteredData[i].Item_Monthly_Rent;
    }
    setTotal(totalAmt);
  }, [filteredData]);

  useEffect(() => {
    if (data.length !== 0) {
      setShowCartDiv(true);
      document.body.style.overflow = "hidden";
    } else {
      setShowCartDiv(false);
      document.body.style.overflow = "auto";
    }
  }, [data.length]);

  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/cart.json")
      .then((res) => res.json())
      .then((cartData) => {
        let filteredData = Object.keys(cartData)
          .filter(
            (key) =>
              cartData[key].Username === loginName &&
              cartData[key].Email === loginEmail
          )
          .map((key) => ({
            ...cartData[key],
            id: key,
          }));

        setData(filteredData);
      });
  }, [loginName, loginEmail]);
  let handleRemove = async (index) => {
    let itemId = data[index].id;
    let itemData = data[index];
    try {
      await fetch(
        `https://rento-mojo-default-rtdb.firebaseio.com/search_items.json`,
        {
          method: "POST",
          body: JSON.stringify(itemData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await fetch(
        `https://rento-mojo-default-rtdb.firebaseio.com/cart/${itemId}.json`,
        {
          method: "DELETE",
        }
      );
      setData((prevData) => {
        let newData = [...prevData];
        newData.splice(index, 1);
        return newData;
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <div className={styles.main}>
      <Navbar onLogin={showLoginHandler} onSignup={showSignupHandler} />
      {!showCartDiv && (
        <div className={styles.noItemsDiv}>
          <img
            className={styles.noItemImage}
            alt="no-image-image"
            src="https://www.rentomojo.com/public/images/error/no-cart.png"
          />
          <p className={styles.noItemHeading}>No Items in Cart</p>
          <p className={styles.noItemDesc}>
            Add a few items to your cart and come back here for an express
            checkout process!
          </p>
        </div>
      )}
      {showCartDiv && (
        <div className={styles.mainCartDiv}>
          <div className={styles.searchDiv}>
            <input
              className={styles.search}
              placeholder="Search from cart"
              value={searchQuery}
              onChange={handleSearch}
            />
            <p className={styles.cancel} onClick={() => navigate("/")}>
              ✕
            </p>
          </div>
          <div className={styles.cartCardDiv}>
            {filteredData.map((item, index) => {
              return (
                <div className={styles.cartCard} key={item.id}>
                  <div className={styles.imageDiv}>
                    <img
                      className={styles.image}
                      alt="product-image"
                      src={item.Item_Image}
                    />
                  </div>
                  <div className={styles.nameDiv}>
                    <p className={styles.name}>{item.Item_Name}</p>
                    <p className={styles.descDiv}>{item.Item_Desc}</p>
                  </div>
                  <div className={styles.rentDiv}>
                    <p className={styles.rent}>
                      Monthly Rent : ₹ {item.Item_Monthly_Rent}
                    </p>
                    <p className={styles.rent}>
                      Refundable Amt : ₹ {item.Item_Refundable_Deposit}
                    </p>
                    <div
                      className={styles.deleteDiv}
                      onClick={() => handleRemove(index)}
                    >
                      <p className={styles.deleteButton}>Remove from Cart</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.addonDiv}>
            <div className={styles.totalPriceDiv}>
              <p className={styles.totalHeading}>
                Total : ₹ <span className={styles.totalAmount}>{total}</span>/mo
              </p>
            </div>
            <div className={styles.proceedDiv}>
              <button
                className={styles.proceedBtn}
                onClick={() => setShowCheckout(!showCheckout)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      {showCheckout && filteredData.length > 0 && <Checkout closeHandler={closeCheckoutHandler}/>}
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
export default Cart;
