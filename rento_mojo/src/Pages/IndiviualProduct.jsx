import Navbar from "../Components/Navbar";
import styles from "./IndiviualProduct.module.css";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import virus from "../Components/Assets/virus.png";
import delivery from "..//Components/Assets/delivery-truck.png";
let IndiviualProduct = () => {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let { category, name } = useParams();
  let [features, setFeatures] = useState([]);
  let [recommended, setRecommended] = useState([]);
  let [total, setTotal] = useState(1);
  let [showTotal, setShowTotal] = useState();
  let [discountedRent, setDiscountedRent] = useState(0);
  let setMonths = (discount) => {
    let newRent = data.monthly_rent * (1 - discount);
    setTotal(newRent);
    setShowTotal(newRent.toFixed(0));
  };
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/all_products.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let filteredData = Object.values(data).filter((item) => {
          return item.category === category && item.name === name;
        });
        if (filteredData.length > 0) {
          setData(filteredData[0]);
          setTotal(filteredData[0].monthly_rent);
          setShowTotal(filteredData[0].monthly_rent.toFixed(0));
          if (filteredData[0].features.length > 0) {
            setFeatures(filteredData[0].features);
          }
        }
      });
  }, []);
  useEffect(() => {
    if (data) {
      document.body.style.overflow = "auto";
    }
  }, [data]);
  useEffect(() => {
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/all_products.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let filteredData = Object.values(data).filter((item) => {
          return item.category === category && item.name !== name;
        });
        let Data = [];
        for (let i = 0; i < filteredData.length; i = i + 3) {
          Data.push(filteredData[i]);
        }
        setRecommended(Data);
      });
  }, []);
  let navigateToRecommendedPageHandler = (category, name) => {
    navigate(`/${category}/${name}`);
    window.location.reload(true);
  };
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.coloredDiv}></div>
      <div className={styles.flexDiv}>
        <div className={styles.ImageDiv}>
          <img
            src={data.image}
            className={styles.image}
            alt="single-product-image"
          />
          <div className={styles.covidDiv}>
            <img className={styles.covidImage} alt="covid-image" src={virus} />
            <p className={styles.covidHeading}>
              Safety precautions during COVID-19. We’re taking additional steps
              and precautionary measures to protect our community from COVID-19.
            </p>
          </div>
          <div className={styles.detailsDiv}>
            <p className={styles.detailsHeading}>Product Details</p>
          </div>
          <div className={styles.sectionDiv}>
            <div className={styles.sectionImgDiv}>
              <img className={styles.sectionImg} alt="image" src={data.image} />
            </div>
            <div className={styles.descDiv}>
              <p className={styles.sectionName}>{data.name}</p>
              <p className={styles.sectionDesc}>{data.desc}</p>
              <p className={styles.featuresHeading}>Features & Specs</p>
              <ul className={styles.unorderedList}>
                {features.map((item) => {
                  return (
                    <li key={item} className={styles.list}>
                      {item}
                    </li>
                  );
                })}
              </ul>
              <p className={styles.materialHeading}>
                Material & Colors {"->"} {data.material_and_color}
              </p>
              <div className={styles.priceDiv}>
                <p className={styles.monthlyPrice}>
                  Monthly Rental :{" "}
                  <span className={styles.price}>₹ {data.monthly_rent}</span>
                </p>
                <p className={styles.monthlyPrice}>
                  Deposit :{" "}
                  <span className={styles.price}>
                    ₹ {data.refundable_deposit}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.recommededDiv}>
            <p className={styles.recommededHeading}>
              You may also like this product(s)
            </p>
            <p className={styles.recommededDesc}>
              Products recommendation based on your search activity
            </p>
            <div className={styles.recommendedCardsDiv}>
              {recommended.map((item) => {
                return (
                  <div
                    className={styles.card}
                    onClick={() =>
                      navigateToRecommendedPageHandler(item.category, item.name)
                    }
                  >
                    <img
                      className={styles.cardImage}
                      alt="recommended-products-image"
                      src={item.image}
                    />
                    <p className={styles.recommendedName}>{item.name}</p>
                    <div className={styles.recommendedInfoDiv}>
                      <div className={styles.recommendedRentDiv}>
                        <p className={styles.recommededRentHeading}>Rent</p>
                        <p className={styles.recommededRent}>
                          ₹ {item.monthly_rent} /mo
                        </p>
                      </div>
                      <div className={styles.checkDiv}>
                        <button
                          className={styles.checkBtn}
                          onClick={() =>
                            navigateToRecommendedPageHandler(
                              item.category,
                              item.name
                            )
                          }
                        >
                          Check Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.infoDiv}>
          <div className={styles.infoHeadingDiv}>
            <p className={styles.infoHeading}>{data.name}</p>
          </div>
          <div className={styles.questionDiv}>
            <p className={styles.question}>
              How long do you want to rent this for? (Months)
            </p>
          </div>
          <div className={styles.btnDiv}>
            <button className={styles.months} onClick={()=>setMonths(0)}>
              3 +
            </button>
            <button className={styles.months} onClick={() => setMonths(0.25)}>6 +</button>
            <button className={styles.months} onClick={() => setMonths(0.40)}>12 +</button>
          </div>
          <div className={styles.infoPricesDiv}>
            <div className={styles.pricesDiv}>
              <p className={styles.infoPrices}>
                ₹ {showTotal} <span className={styles.nothing}>/mo</span>
              </p>
              <p className={styles.siderole}>Monthly Rent</p>
            </div>
            <div className={styles.pricesDiv}>
              <p className={styles.infoPrices}>₹ {data.refundable_deposit}</p>
              <p className={styles.siderole}>Refundable Deposit</p>
            </div>
          </div>
          <div className={styles.infoDescDiv}>
            <p className={styles.productDesc}>Product Description</p>
            <p className={styles.infoDesc}>{data.desc}</p>
          </div>
          <div className={styles.deliveryDiv}>
            <img
              src={delivery}
              className={styles.deliveryImage}
              alt="delivery-van"
            />
            <p className={styles.deliveryText}>
              Delivery in {data.delivery_in_days} days post KYC
            </p>
          </div>
          <div className={styles.planDiv}>
            <p className={styles.book}>Book Your Plan</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default IndiviualProduct;
