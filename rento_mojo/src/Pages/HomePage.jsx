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
let HomePage = () => {
  let {
    showCity,
    setShowCity,
    selectedCity,
    setSelectedCity,
    close,
    hoverShow,
    setHoverShow,
    setClose,
  } = useContext(AuthContext);
  let handleShowCity = () => {
    if (selectedCity) {
      setShowCity(!showCity);
    }
  };
  useEffect(() => {
    if (showCity) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showCity]);
  useEffect(() => {
    setClose(false);
    setShowCity(true);
    if (selectedCity) {
      setShowCity(false);
      setClose(true);
    }
  }, []);
  return (
    <div className={styles.main}>
      <Navbar onShow={handleShowCity} />
      {hoverShow ? (
        <div
          className={styles.recSearchDiv}
          onMouseLeave={() => setHoverShow(false)}
        ></div>
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
    </div>
  );
};
export default HomePage;
