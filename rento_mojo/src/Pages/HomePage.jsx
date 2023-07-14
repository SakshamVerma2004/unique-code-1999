import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import styles from "./HomePage.module.css";
import Location from "../Components/Location";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import Categories from "../Components/Categories";
import DisplayProducts from "../Components/DisplayProducts";
import Benefits from "../Components/Benefits";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import Login from "../Components/Login";
import animal from "../Components/Assets/animal-3629.gif";
import Signup from "../Components/Signup";
let HomePage = () => {
  let navigate = useNavigate();
  let [showLogin, setShowLogin] = useState(false);
  let [showSignup, setShowSignup] = useState(false);
  let [confirmLogout, setConfirmLogout] = useState(false);
  let [data, setData] = useState([]);
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
  let hideConfirmLogout = () => {
    setConfirmLogout(false);
  };
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/categories.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);
  let {
    showCity,
    setShowCity,
    selectedCity,
    hoverShow,
    setHoverShow,
    setClose,
    showProfile,
    setShowProfile,
    loginName,
    loginEmail,
    setIsLogin,
    isLogin,
  } = useContext(AuthContext);
  let handleShowCity = () => {
    if (selectedCity) {
      setShowCity(!showCity);
    }
  };
  useEffect(() => {
    if (showCity || showLogin || showSignup || showProfile || confirmLogout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showCity, showLogin, showProfile, showSignup, confirmLogout]);
  useEffect(() => {
    setClose(false);
    setShowCity(true);
    if (selectedCity) {
      setShowCity(false);
      setClose(true);
    }
  }, []);
  let handleMovePage = (value) => {
    navigate(`/${value}`);
  };
  let hideLoginHandler = () => {
    setShowLogin(false);
  };
  let hideLoginHandlerForYes = () => {
    setIsLogin(false);
    setConfirmLogout(false);
  };
  let confirmLogoutHandler = () => {
    setShowProfile(false);
    setConfirmLogout(true);
  };
  return (
    <div className={styles.main}>
      <Navbar
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
      {hoverShow ? (
        <div
          className={styles.recSearchDiv}
          onMouseLeave={() => setHoverShow(false)}
        >
          <div className={styles.hoverHeadingDiv}>
            <p className={styles.hoverHeading}>
              You can search out the products only from given options . Click on
              any to see results .
            </p>
            <p className={styles.cancel} onClick={() => setHoverShow(false)}>
              ✕
            </p>
          </div>
          <div className={styles.buttonDiv}>
            {data.map((item) => {
              return (
                <button
                  className={styles.btn}
                  value={item}
                  onClick={() => handleMovePage(item)}
                  key={item}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      <Slider />
      {showCity && (
        <div className={styles.locationOverlay}>
          <Location />
        </div>
      )}
      <Categories />
      <DisplayProducts />
      <Benefits />
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
export default HomePage;
