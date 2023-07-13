import styles from "./Signup.module.css";
import car from "../Components/Assets/car-1803.gif";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../Context/AuthContextProvider";
let Signup = ({ showLoginAndHideSignup, onHide }) => {
  let { isSignup, setIsSignup } = useContext(AuthContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let handleSignup = () => {
    let pattern = /^[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*@gmail.com$/;
    if (name.trim().length < 3) {
      swal("Invalid Name", "Name length cannot be less than 3", "error");
      return;
    }
    if (
      email.trim().length < 5 &&
      !email.includes("@gmail.com") &&
      !pattern.test(email)
    ) {
      swal(
        "Invalid Email",
        "Only Valid gmail id is supported with correct format",
        "error"
      );
      return;
    }
    fetch("https://rento-mojo-default-rtdb.firebaseio.com/signup.json")
      .then((res) => res.json())
      .then((signupData) => {
        let signup = Object.values(signupData);
        let found = signup.find(
          (obj) => obj.Username === name && obj.Email === email
        );
        if (found) {
          swal("Already Registered", "You are already registered", "warning");
          showLoginAndHideSignup();
          return;
        }
        fetch("https://rento-mojo-default-rtdb.firebaseio.com/signup.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date_DAY_MM_DD_YY: new Date().toDateString(),
            time_HH_MM_SS: new Date().toLocaleTimeString(),
            Username: name,
            Email: email,
          }),
        }).then((res) => {
          swal(
            "Account Created",
            "Your Account has successfully been created",
            "success"
          );
          setIsSignup(true);
          showLoginAndHideSignup();
          setEmail("");
          setName("");
          return res.json();
        });
      });
  };
  useEffect(() => {
    if (isSignup) {
      showLoginAndHideSignup();
    }
  }, [isSignup]);
  return (
    <div className={styles.main}>
      <div className={styles.imageDiv}>
        <img className={styles.image} alt="signup-image" src={car} />
      </div>
      <div className={styles.inputDiv}>
        <div className={styles.inputHeadingDiv}>
          <p className={styles.inputHeading}>Sign Up</p>
          <p className={styles.cancel} onClick={onHide}>
            ✕
          </p>
        </div>
        <p className={styles.name}>Enter your name</p>
        <input
          className={styles.nameInput}
          placeholder="Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className={styles.email}>Enter your email</p>
        <input
          className={styles.emailInput}
          placeholder="Your valid Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.btnDiv}>
          <button className={styles.createBtn} onClick={handleSignup}>
            Create account
          </button>
        </div>
        <p className={styles.para}>
          Already a user ?{" "}
          <Link className={styles.link} onClick={showLoginAndHideSignup}>
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
