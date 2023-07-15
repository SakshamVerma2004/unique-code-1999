import { useContext, useState } from "react";
import styles from "./Checkout.module.css";
import { AuthContext } from "../Context/AuthContextProvider";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
let Checkout = () => {
    let navigate=useNavigate();
    let homeHandler=()=>{
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }
  let [address, setAddress] = useState("");
  let [phone, setPhone] = useState("");
  let [pin, setPin] = useState("");
  let [acc, setAcc] = useState("");
  let [name, setName] = useState("");
  let [cvv, setCvv] = useState("");
  let submitHandler = () => {
    if (phone.trim().length < 10) {
      swal(
        "Invalid Phone Number",
        "Please enter a correct phone number",
        "error"
      );
      return;
    }
    if (address.trim().length < 3) {
      swal("Invalid Address", "Please enter a valid address", "error");
      return;
    }
    if (pin.trim().length < 6) {
      swal("Invalid PinCode", "Please enter a valid pincode", "error");
      return;
    }
    if (name.trim().length < 3) {
      swal("Invalid Name", "Please enter a valid name", "error");
      return;
    }
    if (acc.trim().length < 12) {
      swal(
        "Invalid Account Number",
        "Please enter a valid account number",
        "error"
      );
      return;
    }
    if (cvv.trim().length < 3) {
      swal("Invalid CVV", "Please enter a valid cvv", "error");
      return;
    }
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/checkout_details.json",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            Username:loginName,
            Email:loginEmail,
            Phone_Number:phone,
            Address:address,
            PinCode:pin,
            Account_Number:acc,
            Name_On_Card:name,
            date_DAY_MM_DD_YY: new Date().toDateString(),
              time_HH_MM_SS: new Date().toLocaleTimeString()
        })
    })
    .then((res)=>{
        swal("Order Sent","Expected Time to deliver (5 Days from Today)","success");
        homeHandler();
        return res.json();
    })
  };
  let { total, selectedCity, loginName, loginEmail } = useContext(AuthContext);
  return (
    <div className={styles.main}>
      <div className={styles.headingDiv}>
        <p className={styles.heading}>RentoMojo Checkout Process</p>
        <p className={styles.desc}>
          Thanks for choosing RentoMojo . We are highly appreciated by your
          renting action and will be love to see you next time also .
        </p>
        <div className={styles.detailsDiv}>
          <div className={styles.nameDiv}>
            <p className={styles.name}>Your Name</p>
            <input
              className={styles.input}
              value={loginName}
              contentEditable="false"
            />
          </div>
          <div className={styles.emailDiv}>
            <p className={styles.name}>Your Email</p>
            <input
              className={styles.input}
              value={loginEmail}
              contentEditable="false"
            />
          </div>
        </div>
        <div className={styles.detailsDiv}>
          <div className={styles.nameDiv}>
            <p className={styles.name}>Your Phone Number</p>
            <input
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
            />
          </div>
          <div className={styles.emailDiv}>
            <p className={styles.name}>Your Address</p>
            <input
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.detailsDiv}>
          <div className={styles.nameDiv}>
            <p className={styles.name}>Your Area Pincode</p>
            <input
              className={styles.input}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={6}
            />
          </div>
        </div>
        <p className={styles.cardDetailsHeading}>
          Your Card Details (Debit Card Only) ({selectedCity})
        </p>
        <div className={styles.cardDetailsDiv}>
          <input
            className={styles.input}
            placeholder="Name on Card"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            className={styles.input}
            placeholder="Account Number"
            onChange={(e) => setAcc(e.target.value)}
            value={acc}
            maxLength={12}
          />
          <input
            className={styles.input}
            placeholder="CVV"
            onChange={(e) => setCvv(e.target.value)}
            value={cvv}
            maxLength={3}
          />
        </div>
        <p className={styles.total}>Your Total : ₹ {total}</p>
        <div className={styles.buyDiv}>
          <button className={styles.buyBtn} onClick={submitHandler}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
