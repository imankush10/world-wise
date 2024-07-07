/* eslint-disable react/prop-types */
import React from "react";

import { useCities } from "../contexts/CityContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

function CityItem({ city }) {
  const { formatDate, currentCity, removeCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity?.id == id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>
          <img src={`https://flagcdn.com/24x18/${emoji.toLowerCase()}.png`} />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            removeCity(city);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
