import React, { useState, useEffect, useContext } from "react";
import styles from "./Location.module.css";
import { AuthContext } from "../Context/AuthContextProvider";

let Location = () => {
  let [searchValue, setSearchValue] = useState("");
  let {
    selectedCity,
    setSelectedCity,
    close,
    setClose,
    showCity,
    setShowCity,
  } = useContext(AuthContext);
  let [cityList, setCityList] = useState([
    {
      name: "Bangalore",
      imageUrl:
        "https://th.bing.com/th/id/OIP.lBovct3a-jvbgFoX8u0ktAHaFs?pid=ImgDet&rs=1",
    },
    {
      name: "Mumbai",
      imageUrl:
        "https://cdn3.iconfinder.com/data/icons/asia-pacific-cities/100/Exports_Mumbai-512.png",
    },
    {
      name: "Pune",
      imageUrl:
        "https://media.istockphoto.com/vectors/historical-icon-pune-city-shaniwar-wada-vector-id994481996?k=6&m=994481996&s=612x612&w=0&h=pc1P4_qRS2685O-fGeHMG4Z9YVrzViCuYsU7V8D6ox4=",
    },
    {
      name: "Delhi",
      imageUrl:
        "https://cdn.icon-icons.com/icons2/2756/PNG/512/delhi_indian_building_heritage_places_icon_176298.png",
    },
    {
      name: "Noida",
      imageUrl:
        "https://cdn.dribbble.com/users/2014642/screenshots/5973085/noida-01_4x.png?compress=1&resize=400x300",
    },
    {
      name: "Gurgaon",
      imageUrl:
        "https://media.istockphoto.com/vectors/gurgaon-india-city-skyline-with-color-buildings-vector-id1056588258?k=6&m=1056588258&s=612x612&w=0&h=clTxdXGRd5QJZgm9JqjsttLU8l8z03pRHiUsrYUOtNU=",
    },
    {
      name: "Hyderabad",
      imageUrl:
        "https://th.bing.com/th/id/OIP.86uHLACK61AVXlkIYT9F5wAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Chennai",
      imageUrl:
        "https://cdn.dribbble.com/users/949592/screenshots/3454298/day_22_-_chennai.png",
    },
    {
      name: "Ahmedabad",
      imageUrl:
        "https://thumbs.dreamstime.com/b/ahmedabad-city-jama-masjid-mosque-icon-illustration-as-eps-file-256168301.jpg",
    },
    {
      name: "Mysore",
      imageUrl:
        "https://th.bing.com/th/id/R.b15bc8e73b709ea9866d4ec7a24264e3?rik=PdpFKpeV6rxW8A&riu=http%3a%2f%2fwww.languagecurry.com%2fimg%2fmysore+palace.png&ehk=SfLir6JR2gI8z1twaoI%2b%2fwd9fC76%2bGSW3slbVNGG1fw%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      name: "Jaipur",
      imageUrl:
        "https://media.istockphoto.com/vectors/historical-icon-jaipur-city-hawa-mahal-vector-id993957498",
    },
    {
      name: "Faridabad",
      imageUrl:
        "https://tashheer.com/wp-content/uploads/2021/10/faisalabad-city-icon.jpg",
    },
    {
      name: "Ghaziabad",
      imageUrl:
        "https://th.bing.com/th/id/R.9a20106bc56bb92f6f705779452e33f6?rik=b1t2HAgXOHKbww&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2ficons8%2fwindows-8%2f512%2fCity-City-Hall-icon.png&ehk=dRyfYt4OKHPAhnxfn%2flsglaPziD0c83PtCQQpNe2fco%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      name: "Gandhinagar",
      imageUrl:
        "https://th.bing.com/th/id/OIP.KvefzHtM-EUvBCGyYCuYYgAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Chandigarh",
      imageUrl:
        "https://th.bing.com/th/id/OIP.k6OIjXEIDyaDronNL2pYagAAAA?pid=ImgDet&rs=1",
    },
    {
      name: "Kolkata",
      imageUrl:
        "https://cdn4.iconfinder.com/data/icons/indian-cities-landmarks/100/Kolkata-512.png",
    },
  ]);

  let handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  let handleCityClick = (name) => {
    setSelectedCity(name);
    setShowCity(false);
  };

  let filteredCityList = cityList.filter((city) =>
    city.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  let crossHandler = () => {
    setSearchValue("");
    if (searchValue.trim().length === 0) {
      setShowCity(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.searchDiv}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search City here"
          value={searchValue}
          onChange={handleSearch}
        />
        <button className={styles.cross} onClick={crossHandler} disabled={!selectedCity}>
          ✕
        </button>
      </div>
      <div className={styles.locationDiv}>
        {filteredCityList.map((city, index) => (
          <div
            className={styles.city}
            key={index}
            onClick={() => handleCityClick(city.name)}
          >
            <img
              src={city.imageUrl}
              className={styles.cityImage}
              alt="city-image"
            />
            <p className={styles.locationName}>{city.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
