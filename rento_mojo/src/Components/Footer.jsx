import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
let Footer = () => {
  return (
    <div className={styles.main}>
      <div className={styles.headingDiv}>
        <p className={styles.heading}>
          rentoMojo: Upgrade To Your Dream Lifestyle At An Unbelievably Low
          Price!
        </p>
        <p className={styles.para}>
          RentoMojo is your ticket to a better lifestyle in India. We provide
          designer furniture, the newest gadgets, and bestselling appliances on
          rent in major Indian cities. You can use the best products available
          in the market at just a fraction of their retail value. You pay us a
          small monthly fee, which becomes lesser the longer you rent from us.
        </p>
        <p className={styles.para}>
          Besides saving you money, we do our best to provide you with an
          exceptional, super-comfortable rental experience. Our ordering process
          is straightforward and efficient. You can order from us in a matter of
          minutes from your PC or smartphone. We offer speedy delivery in major
          Indian cities, namely Bangalore, Mumbai, Delhi, Chennai, Pune,
          Hyderabad, Gurgaon, and Noida.
        </p>
        <p className={styles.para}>
          No matter what product you rent from us, we will provide you with
          several complementary benefits with it. The benefits range from a
          yearly product swap option to a periodic free maintenance service.
          These are benefits no regular retailer offers. Start renting now!
        </p>
      </div>
      <div className={styles.flexDiv}>
        <div className={styles.infoDiv}>
          <h4 className={styles.infoHeading}>RENTOMOJO</h4>
          <div>
            <Link>About Us</Link>
          </div>
          <div>
            <Link>About Us</Link>
          </div>
          <div>
            <Link>Investors</Link>
          </div>
          <div>
            <Link>Careers</Link>
          </div>
          <div>
            <Link>Contact</Link>
          </div>
          <div>
            <Link>Our benefits</Link>
          </div>
          <div>
            <Link>Sitemap</Link>
          </div>
        </div>
        <div className={styles.infoDiv}>
          <h4 className={styles.infoHeading}>INFORMATION</h4>
          <div>
            <Link>Blog</Link>
          </div>
          <div>
            <Link>FAQ's</Link>
          </div>
          <div>
            <Link>Documents Required</Link>
          </div>
        </div>
        <div className={styles.infoDiv}>
          <h4 className={styles.infoHeading}>POLICIES</h4>
          <div>
            <Link>Shipping Policy</Link>
          </div>
          <div>
            <Link>Cancellation & Return</Link>
          </div>
          <div>
            <Link>Privacy Policy</Link>
          </div>
          <div>
            <Link>Rental Terms & Conditions</Link>
          </div>
          <div>
            <Link>Referral Terma & Conditions</Link>
          </div>
        </div>
        <div className={styles.infoDiv}>
          <h4 className={styles.infoHeading}>NEED HELP ?</h4>
          <div>
            <button className={styles.btn}>Chat with us</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
