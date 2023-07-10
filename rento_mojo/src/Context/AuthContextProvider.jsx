import { createContext, useState } from "react";
export let AuthContext = createContext();
let AuthContextProvider = ({ children }) => {
  let [showCity, setShowCity] = useState(false);
  let [changeColor, setChangeColor] = useState(false);
  let [selectedCity, setSelectedCity] = useState(null);
  let [close,setClose]=useState(false);
  let obj = {
    showCity,
    setShowCity,
    changeColor,
    setChangeColor,
    selectedCity,
    setSelectedCity,
    close,setClose
  };
  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
