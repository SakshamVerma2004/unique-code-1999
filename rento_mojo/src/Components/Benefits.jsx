import styles from "./Benefits.module.css";
import cancel from "./Assets/cancel.png";
import bed from "./Assets/double-bed.png";
import repair from "./Assets/maintenance.png";
import returns from "./Assets/return.png";
import upgrade from "./Assets/upgrade.png";
import location from "./Assets/placeholder.png";
let Benefits=()=>{
    return (
        <div className={styles.main}>
            <div className={styles.headingDiv}>
                <p className={styles.heading}>There's more to renting</p>
            </div>
            <div className={styles.benefitsDiv}>
                <div className={styles.benefits}>
                    <img src={bed} alt="" className={styles.image}/>
                    <p className={styles.head}>Finest Quality Products</p>
                    <p className={styles.desc}>Quality matters to you, and us! That's why we do a strict quality-check for every product.</p>
                </div>
                <div className={styles.benefits}>
                    <img src={location} alt="" className={styles.image}/>
                    <p className={styles.head}>Free relocation</p>
                    <p className={styles.desc}>Changing your house or even your city? We'll relocate your rented products for free.</p>
                </div>
                <div className={styles.benefits}>
                    <img src={repair} alt="" className={styles.image}/>
                    <p className={styles.head}>Free maintenance</p>
                    <p className={styles.desc}>Keeping your rented products in a spick and span condition is on us, so you can sit back and relax.</p>
                </div>
                <div className={styles.benefits}>
                    <img src={cancel} alt="" className={styles.image}/>
                    <p className={styles.head}>Cancel anytime</p>
                    <p className={styles.desc}>Pay only for the time you use the product and close your subscription without any hassle.</p>
                </div>
                <div className={styles.benefits}>
                    <img src={returns} alt="" className={styles.image}/>
                    <p className={styles.head}>Easy return on delivery</p>
                    <p className={styles.desc}>If you don't like the product on delivery, you can return it right away—no questions asked.</p>
                </div>
                <div className={styles.benefits}>
                    <img src={upgrade} alt="" className={styles.image}/>
                    <p className={styles.head}>Keep upgrading</p>
                    <p className={styles.desc}>Bored of the same product? Upgrade to try another, newer design and enjoy the change!</p>
                </div>
            </div>
        </div>
    )
}
export default Benefits;