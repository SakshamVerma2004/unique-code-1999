import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DisplayProducts.module.css";
let DisplayProducts = () => {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let indiviualProductHandler = (category, name) => {
    navigate(`/${category}/${name}`);
  };
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/all_products.json")
      .then((res) => res.json())
      .then((responseData) => {
        let products = Object.values(responseData);
        let updatedData = [];
        for (let i = 0; i < products.length; i += 8) {
          updatedData.push(products[i]);
        }
        setData(updatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.headingDiv}>
        <p className={styles.heading}>You'll Love to take these home</p>
      </div>
      <div className={styles.cardDiv}>
        {data.map((item) => (
          <div
            className={styles.card}
            key={item.id}
            onClick={() => indiviualProductHandler(item.category, item.name)}
          >
            <img src={item.image} className={styles.image} />
            <div className={styles.nameDiv}>
              <p className={styles.name}>{item.name}</p>
            </div>
            <div className={styles.infoDiv}>
              <div className={styles.rentDiv}>
                <p className={styles.rentHeading}>Rent</p>
                <p className={styles.rent}>₹ {item.monthly_rent}/mo</p>
              </div>
              <div className={styles.moreDiv}>
                <button
                  className={styles.more}
                  onClick={() =>
                    indiviualProductHandler(item.category, item.name)
                  }
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DisplayProducts;
