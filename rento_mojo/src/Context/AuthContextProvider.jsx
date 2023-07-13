import { createContext, useState } from "react";
export let AuthContext = createContext();
let AuthContextProvider = ({ children }) => {
  let [showCity, setShowCity] = useState(false);
  let [changeColor, setChangeColor] = useState(false);
  let [selectedCity, setSelectedCity] = useState(null);
  let [close,setClose]=useState(false);
  let [hoverShow,setHoverShow]=useState(false);
  let [isSignup,setIsSignup]=useState(false);
  let [isLogin,setIsLogin]=useState(false);
  let [loginName,setLoginName]=useState("");
  let [loginEmail,setLoginEmail]=useState("");
  let [showProfile, setShowProfile] = useState(false);
  let [showRecommended,setShowRecommended]=useState(false);
  let obj = {
    showCity,
    setShowCity,
    changeColor,
    setChangeColor,
    selectedCity,
    setSelectedCity,
    close,setClose,
    hoverShow,setHoverShow,
    isLogin,setIsLogin,
    isSignup,setIsSignup,
    loginName,setLoginName,
    loginEmail,setLoginEmail,
    showRecommended,setShowRecommended,
    showProfile, setShowProfile
  };
  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
