import styles from "./Login.module.css";
import gif from "./Assets/rocket-3972.gif";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../Context/AuthContextProvider";
let Login = ({ onHide, showSignupAndHideLogin }) => {
  let {
    isLogin,
    setIsLogin,
    loginEmail,
    setLoginEmail,
    loginName,
    setLoginName,
  } = useContext(AuthContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let handleLogin = () => {
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
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let loginData = Object.values(data);
        let found = loginData.find((obj) => {
          return obj.Username === name && obj.Email === email;
        });
        if (!found) {
          swal(
            "Incorrect Credentials",
            "Your Entered credentials does not match any data records",
            "error"
          );
          return;
        } else {
          fetch("https://rento-mojo-default-rtdb.firebaseio.com/login.json", {
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
              "Successful",
              "Your Entered credentials are correct",
              "success"
            );
            setIsLogin(true);
            setLoginEmail(email);
            setLoginName(name);
            setEmail("");
            setName("");
            return res.json();
          });
        }
      });
  };
  useEffect(() => {
    if (isLogin) {
      onHide();
    }
  }, [isLogin]);
  return (
    <div className={styles.main}>
      <div className={styles.imageDiv}>
        <img className={styles.image} alt="gif-image" src={gif} />
      </div>
      <div className={styles.inputDiv}>
        <div className={styles.inputNameDiv}>
          <p className={styles.loginHeading}>Login</p>
          <p className={styles.cancel} onClick={onHide}>
            ✕
          </p>
        </div>
        <p className={styles.name}>Enter your name</p>
        <input
          className={styles.nameInput}
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className={styles.email}>Enter your email</p>
        <input
          className={styles.emailInput}
          placeholder="Your valid email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.btnDiv}>
          <button className={styles.btn} onClick={handleLogin}>
            Log in
          </button>
        </div>
        <p className={styles.para}>
          Already a user ?{" "}
          <Link className={styles.link} onClick={showSignupAndHideLogin}>
            {" "}
            Create an account now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
