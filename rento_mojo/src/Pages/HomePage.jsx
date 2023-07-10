import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import styles from "./HomePage.module.css";
import Location from "../Components/Location";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import Categories from "../Components/Categories";
import DisplayProducts from "../Components/DisplayProducts";
let HomePage = () => {
  let {
    showCity,
    setShowCity,
    selectedCity,
    setSelectedCity,
    close,
    setClose,
  } = useContext(AuthContext);
  let handleShowCity = () => {
    setShowCity(!showCity);
  };
  return (
    <div className={styles.main}>
      <Navbar onShow={handleShowCity} />
      <Slider />
      {showCity && (
        <div className={styles.locationOverlay}>
          <Location />
        </div>
      )}
      <Categories/>
      <DisplayProducts/>
    </div>
  );
};
export default HomePage;