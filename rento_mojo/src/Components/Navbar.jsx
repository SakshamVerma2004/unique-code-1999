import { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
let Navbar = ({ onShow }) => {
  let {
    selectedCity,
    setSelectedCity,
    showCity,
    setShowCity,
    hoverShow,
    setHoverShow,
  } = useContext(AuthContext);
  let navigate = useNavigate();
  let homeHandler = () => {
    navigate("/");
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
          onMouseEnter={() => setTimeout(() => setHoverShow(true), 1000)}
        />
        <img
          className={styles.searchIcon}
          src="https://www.downloadclipart.net/large/magnifying-glass-png-no-background.png"
          alt="search-icon"
        />
      </div>
      <div className={styles.cartDiv}>
        <img
          className={styles.cartImg}
          alt="cart-image"
          src="https://th.bing.com/th/id/OIP.3kpi4mZ6JzM81fTpQlbHEgHaHJ?pid=ImgDet&rs=1"
        />
        <p className={styles.cart}>Cart</p>
      </div>
      <div className={styles.loginDiv}>
        <button className={styles.loginButton} disabled={showCity}>
          Login / Signup
        </button>
      </div>
    </div>
  );
};
export default Navbar;
