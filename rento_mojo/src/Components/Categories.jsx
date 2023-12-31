import { useContext, useEffect, useState } from "react";
import styles from "./Categories.module.css";
import bed from "./Assets/bed.png";
import fridge from "./Assets/fridge.png";
import mobile from "./Assets/mobile-phone.png";
import sofa from "./Assets/sofa.png";
import weights from "./Assets/weights.png";
import work from "./Assets/work-table.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
let Categories = () => {
  let {showCity,setShowCity}=useContext(AuthContext);
  let navigate=useNavigate();
  let images = [sofa, bed, fridge, mobile, weights, work];
  let [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/categories.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategory(data);
      });
  }, []);
  let moveToCategory=(category)=>{
    if(!showCity){
      navigate(`/${category}`);
    }
  }
  return (
    <div className={styles.main}>
      <div className={styles.categoryContainer}>
        {category.map((item, index) => (
          <div className={styles.singleCategory} key={index} onClick={()=>moveToCategory(item)}>
            <img
              src={images[index % images.length]}
              className={styles.categoryImage}
              alt="category"
            />
            <p className={styles.name}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Categories;
