import { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import {Navigate, useNavigate} from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
let Navbar=({onShow})=>{
    let {changeColor, setChangeColor,selectedCity, setSelectedCity}=useContext(AuthContext);
    let navigate=useNavigate();
    let homeHandler=()=>{
        navigate("/");
    }
    return (
        <div className={styles.main}>
            <div className={styles.logoDiv} onClick={homeHandler}>
                <div className={styles.logoImg}>
                    <p className={styles.logoInsideText}>m</p>
                </div>
                <h3 className={styles.logoText}>RentoMojo</h3>
            </div>
            <div className={styles.locationDiv} onClick={onShow}>
                <p className={styles.location}>{selectedCity ? selectedCity : "Select City"}</p>
                <p className={styles.arrow}></p>
            </div>
            <div className={styles.searchDiv}>
                <input type="text" className={styles.search} placeholder="Search for products"/>
                <img className={styles.searchIcon} src="https://www.downloadclipart.net/large/magnifying-glass-png-no-background.png" alt="search-icon"/>
            </div>
            <div className={styles.cartDiv}>
                <img className={styles.cartImg} alt="cart-image" src="https://th.bing.com/th/id/OIP.3kpi4mZ6JzM81fTpQlbHEgHaHJ?pid=ImgDet&rs=1"/>
                <p className={styles.cart}>Cart</p>
            </div>
            <div className={styles.loginDiv}>
            <button className={styles.loginButton}>Login / Signup</button>
            </div>
        </div>
    )
}
export default Navbar;