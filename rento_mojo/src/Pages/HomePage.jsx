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
let HomePage = () => {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
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
  let handleMovePage = (value) => {
    navigate(`/${value}`);
  };
  return (
    <div className={styles.main}>
      <Navbar onShow={handleShowCity} />
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
    </div>
  );
};
export default HomePage;
