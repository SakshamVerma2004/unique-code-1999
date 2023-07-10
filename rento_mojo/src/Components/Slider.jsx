import { useEffect, useState } from "react";
import styles from "./Slider.module.css";
let Slider = () => {
  let [currentImage, setCurrentImage] = useState(0);
  let images = [
    "https://s.rmjo.in/Fitness-offer-banner-for-Web--2.jpg",
    "https://s.rmjo.in/Paytm-Payments-Bank-web-.jpg",
    "https://s.rmjo.in/Referral%20banner%20Web.jpg",
    "https://s.rmjo.in/Bajaj-Pay-HP-banner.jpg",
    "https://s.rmjo.in/Paytm-Offer-banner-HP.jpg",
  ];
  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return ()=>{
        clearInterval(interval);
    }
  }, []);
  return (
    <div className={styles.main}>
        <img className={styles.currentImage} src={images[currentImage]} alt="Sliding-Images"/>
    </div>
  )
};
export default Slider;