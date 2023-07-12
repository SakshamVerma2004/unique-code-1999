import { useEffect, useState } from "react";
import styles from "./IndiviualCategory.module.css";
import { useParams } from "react-router-dom";
import Navbar from "..//Components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer.jsx";
import delivery from "..//Components/Assets/delivery-truck.png";
let IndiviualCategory = () => {
  let navigate = useNavigate();
  let [hoveredCard, setHoveredCard] = useState(false);
  let [submitted, setSubmitted] = useState(false);
  let [submitDis, setSubmitDis] = useState(false);
  let [data, setData] = useState([]);
  let { category } = useParams();
  let [suggestionValue, setSuggestionValue] = useState("");
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/all_products.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let filteredData = data.filter((item) => {
          return item.category === category;
        });
        setData(filteredData);
      });
  }, []);
  let suggestionSubmitHandler = () => {
    if (suggestionValue.trim().length < 3) {
      setSubmitDis(true);
      return;
    }
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/extra.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_DAY_MM_DD_YY: new Date().toDateString(),
        time_HH_MM_SS: new Date().toLocaleTimeString(),
      }),
    });
  };
  let handleNavigate = (category, name) => {
    navigate(`/${category}/${name}`);
  };
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.categoryDiv}>
        <p className={styles.category}>{category}</p>
        <p className={styles.cancel} onClick={()=> navigate("/")}>✕</p>
      </div>
      <div className={styles.flexDiv}>
        <div className={styles.filterDiv}>
          <div className={styles.rentDiv}>
            <p className={styles.rentHeading}>
              Renting available for following months as tenure
            </p>
            <div className={styles.rentButtonDiv}>
              <button className={styles.rentButton}>3 +</button>
              <button className={styles.rentButton}>6 +</button>
              <button className={styles.rentButton}>12 +</button>
            </div>
          </div>
          <div className={styles.sortDiv}>
            <div className={styles.sortHeadingDiv}>
              <p className={styles.sortHeading}>Sort by :-</p>
              <button className={styles.resetButton}>Reset</button>
            </div>
            <button className={styles.sortButton}>Monthly Rent in Asc</button>
            <button className={styles.sortButton}>Monthly Rent in Desc</button>
            <button className={styles.sortButton}>
              Refundable Deposit in Asc
            </button>
            <button className={styles.sortButton}>
              Refundable Deposit in Desc
            </button>
          </div>
          <div className={styles.suggestionDiv}>
            <p className={styles.suggestionHeading}>
              What do you want us to launch next ?
            </p>
            <p className={styles.suggestionDesc}>Suggest us a product</p>
            <div className={styles.suggestionInputDiv}>
              <input
                className={styles.suggestionInput}
                placeholder="Your suggestion"
                type="text"
                value={suggestionValue}
                onChange={(e) => setSuggestionValue(e.target.value)}
              />
              <button
                className={styles.submit}
                disabled={suggestionValue.trim().length < 3}
              >
                Submit
              </button>
            </div>
            {submitted ? (
              <p className={styles.thanks}>
                Thanks for giving us your suggestion . We will positively look
                into this.
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.productDiv}>
          {data.map((item, index) => {
            return (
              <div
                className={styles.card}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleNavigate(item.category, item.name)}
              >
                <img
                  className={styles.image}
                  alt="product-image"
                  src={item.image}
                />
                <div className={styles.nameDiv}>
                  <p className={styles.name}>{item.name}</p>
                </div>
                <div className={styles.infoDiv}>
                  <p className={styles.price}>₹ {item.monthly_rent} / mo</p>
                  <div className={styles.deliveryDiv}>
                    <img
                      className={styles.deliveryImage}
                      alt="delivery-truck"
                      src={delivery}
                    />
                    <p className={styles.deliveryTime}>
                      {item.delivery_in_days} days
                    </p>
                  </div>
                </div>
                {hoveredCard !== index && (
                  <div className={styles.availableDiv}>
                    <p className={styles.availableHeading}>
                      Rented Out For - 3 , 6 ,12 months
                    </p>
                  </div>
                )}
                {hoveredCard === index && (
                  <div className={styles.quickDiv}>
                    <button
                      className={styles.quickBtn}
                      onClick={() => handleNavigate(item.category, item.name)}
                    >
                      Quick View
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default IndiviualCategory;
