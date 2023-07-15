import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";

let Admin = () => {
  let [showAll, setShowAll] = useState(false);
  let [showCart, setShowCart] = useState(false);
  let [showDeleted, setShowdeleted] = useState(false);
  let [showLogin, setShowLogin] = useState(false);
  let [showSignup, setShowSignup] = useState(false);
  let [showCheck, setShowCheck] = useState(false);
  let navigate = useNavigate();
  let homeHandler = () => {
    navigate("/");
  };
  let [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/all_products.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let Data = Object.values(data);
        setAllProducts(Data);
      });
  }, []);
  let [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/cart.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let Data = Object.values(data).filter((item) => {
          return item.name !== "dummy-item";
        });
        setCartItems(Data);
      });
  }, []);
  let [deletedCart, setDeletedCart] = useState([]);
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/search_items.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let Data = Object.values(data);
        setDeletedCart(Data);
      });
  }, []);
  let [loginData, setLoginData] = useState([]);
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/login.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let Data = Object.values(data);
        setLoginData(Data);
      });
  }, []);
  let [signupData, setSignupData] = useState([]);
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/signup.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let Data = Object.values(data);
        setSignupData(Data);
      });
  }, []);
  let [checkoutData, setCheckoutData] = useState([]);
  useEffect(() => {
    fetch(
      "https://rento-mojo-default-rtdb.firebaseio.com/checkout_details.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let Data = Object.values(data);
        setCheckoutData(Data);
      });
  }, []);
  return (
    <div className={styles.main}>
      <p className={styles.moveHome} onClick={homeHandler}>
        Move back to Home
      </p>
      <div className={styles.flexBoxDiv}>
        <div className={styles.dataDiv}>
          <div className={styles.allProductsDiv}>
            <p className={styles.allProductsHeading}>
              Products (Scrollable) ({allProducts.length}){" "}
              <span
                className={styles.clickHere}
                onClick={() => setShowAll(!showAll)}
              >
                {" "}
                {showAll ? "Click here to hide" : "Click here to view"}
              </span>
              {showAll ? (
                <div className={styles.allProductsDataDiv}>
                  {allProducts.map((item) => {
                    return (
                      <div className={styles.allProductCard}>
                        <div className={styles.imageDiv}>
                          <img
                            className={styles.image}
                            alt="all-products-image"
                            src={item.image}
                          />
                        </div>
                        <div className={styles.nameDiv}>
                          <p className={styles.name}>{item.name}</p>
                          <p className={styles.desc}>{item.desc}</p>
                          <p className={styles.monthlyRent}>
                            Monthly Rent : ₹ {item.monthly_rent}
                          </p>
                          <p className={styles.monthlyRent}>
                            Refundable Amt : ₹ {item.refundable_deposit}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className={styles.cartDataDiv}>
            <p className={styles.allProductsHeading}>
              Cart data (Scrollable) ({cartItems.length}){" "}
              <span
                className={styles.clickHere}
                onClick={() => setShowCart(!showCart)}
              >
                {showCart ? "Click here to hide" : "Click here to view"}
              </span>
            </p>
            {showCart ? (
              <div className={styles.allProductsCartDataDiv}>
                {cartItems.map((item) => {
                  return (
                    <div className={styles.allProductCartCard}>
                      <div className={styles.imageDiv}>
                        <img
                          className={styles.image}
                          alt="all-products-image"
                          src={item.Item_Image}
                        />
                      </div>
                      <div className={styles.nameDiv}>
                        <p className={styles.name}>{item.Item_Name}</p>
                        <p className={styles.desc}>{item.Item_Desc}</p>
                        <p className={styles.monthlyRent}>
                          Monthly Rent : ₹ {item.Item_Monthly_Rent}
                        </p>
                        <p className={styles.monthlyRent}>
                          Refundable Amt : ₹ {item.Item_Refundable_Deposit}
                        </p>
                        <p className={styles.loginName}>
                          Added by whom :-{item.Username}
                        </p>
                        <p className={styles.loginName}>
                          Email id :-{item.Email}
                        </p>
                        <p className={styles.loginName}>
                          Date :-{item.date_DAY_MM_DD_YY}
                        </p>
                        <p className={styles.loginName}>
                          Time :-{item.time_HH_MM_SS}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.cartDataDiv}>
            <p className={styles.allProductsHeading}>
              Deleted Cart data (Scrollable) ({deletedCart.length}){" "}
              <span
                className={styles.clickHere}
                onClick={() => setShowdeleted(!showDeleted)}
              >
                {showDeleted ? "Click here to hide" : "Click here to view"}
              </span>
            </p>
            {showDeleted ? (
              <div className={styles.allProductsCartDataDiv}>
                {deletedCart.map((item) => {
                  return (
                    <div className={styles.allProductCartCard}>
                      <div className={styles.imageDiv}>
                        <img
                          className={styles.image}
                          alt="all-products-image"
                          src={item.Item_Image}
                        />
                      </div>
                      <div className={styles.nameDiv}>
                        <p className={styles.name}>{item.Item_Name}</p>
                        <p className={styles.desc}>{item.Item_Desc}</p>
                        <p className={styles.monthlyRent}>
                          Monthly Rent : ₹ {item.Item_Monthly_Rent}
                        </p>
                        <p className={styles.monthlyRent}>
                          Refundable Amt : ₹ {item.Item_Refundable_Deposit}
                        </p>
                        <p className={styles.loginName}>
                          Deleted by whom :-{item.Username}
                        </p>
                        <p className={styles.loginName}>
                          Email id :-{item.Email}
                        </p>
                        <p className={styles.loginName}>
                          Date :-{item.date_DAY_MM_DD_YY}
                        </p>
                        <p className={styles.loginName}>
                          Time :-{item.time_HH_MM_SS}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.loginDataCardDiv}>
          <div className={styles.loginDiv}>
            <p className={styles.allProductsHeading}>
              Login data (Scrollable) ({loginData.length}){" "}
              <span
                className={styles.clickHere}
                onClick={() => setShowLogin(!showLogin)}
              >
                {showLogin ? "Click here to hide" : "Click here to view"}
              </span>
            </p>
            {showLogin ? (
              <div className={styles.loginDataDiv}>
                {loginData.map((item) => {
                  return (
                    <div className={styles.loginDivCard}>
                      <p className={styles.loginText}>
                        Username : {item.Username}
                      </p>
                      <p className={styles.loginEmail}>Email : {item.Email}</p>
                      <p className={styles.loginText}>
                        Date :-{item.date_DAY_MM_DD_YY}
                      </p>
                      <p className={styles.loginText}>
                        Time :-{item.time_HH_MM_SS}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.loginDiv}>
            <p className={styles.allProductsHeading}>
              Signup data (Scrollable) ({signupData.length}){" "}
              <span
                className={styles.clickHere}
                onClick={() => setShowSignup(!showSignup)}
              >
                {showSignup ? "Click here to hide" : "Click here to view"}
              </span>
            </p>
            {showSignup ? (
              <div className={styles.loginDataDiv}>
                {signupData.map((item) => {
                  return (
                    <div className={styles.loginDivCard}>
                      <p className={styles.loginText}>
                        Username : {item.Username}
                      </p>
                      <p className={styles.loginEmail}>Email : {item.Email}</p>
                      <p className={styles.loginText}>
                        Date :-{item.date_DAY_MM_DD_YY}
                      </p>
                      <p className={styles.loginText}>
                        Time :-{item.time_HH_MM_SS}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.loginDiv}>
            <p className={styles.allProductsHeading}>
              Checkout data (Scrollable) ({checkoutData.length}){" "}
              <span
                className={styles.clickHere}
                onClick={() => setShowCheck(!showCheck)}
              >
                {showCheck ? "Click here to hide" : "Click here to view"}
              </span>
            </p>
            {showCheck ? (
              <div className={styles.loginDataDiv}>
                {checkoutData.map((item) => {
                  return (
                    <div className={styles.loginDivCard}>
                      <p className={styles.loginText}>
                        Username : {item.Username}
                      </p>
                      <p className={styles.loginEmail}>Email : {item.Email}</p>
                      <p className={styles.loginText}>
                        Date :-{item.date_DAY_MM_DD_YY}
                      </p>
                      <p className={styles.loginText}>
                        Time :-{item.time_HH_MM_SS}
                      </p>
                      <p className={styles.loginText}>
                        Account Number : {item.Account_Number}
                      </p>
                      <p className={styles.loginText}>
                        Address : {item.Address}
                      </p>
                      <p className={styles.loginText}>
                        Name_On_Card : {item.Name_On_Card}
                      </p>
                      <p className={styles.loginText}>
                        Phobe Number : {item.Phone_Number}
                      </p>
                      <p className={styles.loginText}>
                        Pincode : {item.PinCode}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
