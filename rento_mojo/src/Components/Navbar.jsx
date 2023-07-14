import { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import cart from "../Components/Assets/shopping-cart.png";
import { AuthContext } from "../Context/AuthContextProvider";
let Navbar = ({ onShow, setSearchQuery, searchQuery, onLogin }) => {
  let {
    selectedCity,
    setSelectedCity,
    showCity,
    setShowCity,
    hoverShow,
    setHoverShow,
    showRecommended,
    setShowRecommended,
    loginEmail,
    loginName,
    isLogin,
    showProfile, setShowProfile
  } = useContext(AuthContext);
  let navigate = useNavigate();
  let homeHandler = () => {
    navigate("/");
  };
  let cartNavigator=()=>{
    navigate("/cart");
  }
  let showProfileHandler = () => {
    setShowProfile(!showProfile);
  };
  return (
    <div className={styles.main}>
      <div className={styles.logoDiv} onClick={homeHandler}>
        <div className={styles.logoImg}>
          <p className={styles.logoInsideText}>m</p>
        </div>
        <h3 className={styles.logoText}>RentoMojo</h3>
      </div>
      <div className={styles.locationDiv} onClick={onShow}>
        <p className={showCity ? styles.location : styles.notLocation}>
          {selectedCity ? selectedCity : "Select City"}
        </p>
      </div>
      <div className={styles.searchDiv}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search for products"
          disabled={showCity}
          value={searchQuery}
          onClick={setShowRecommended(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          onMouseEnter={() => setTimeout(() => setHoverShow(true), 1000)}
        />
        <img
          className={styles.searchIcon}
          src="https://www.downloadclipart.net/large/magnifying-glass-png-no-background.png"
          alt="search-icon"
        />
      </div>
      <div className={styles.cartDiv} onClick={cartNavigator}>
        <img className={styles.cartImg} alt="cart-image" src={cart} />
        <p className={styles.cart}>Cart</p>
      </div>
      <div className={styles.loginDiv}>
        {isLogin ? (
          <button className={styles.doneLoginBtn} onClick={showProfileHandler}>
            {loginName}
          </button>
        ) : (
          <button
            className={styles.loginButton}
            disabled={showCity}
            onClick={onLogin}
          >
            Login / Signup
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
