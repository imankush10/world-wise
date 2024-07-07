import { React, memo } from "react";
import styles from "./CountryItem.module.css";

const CountryItem = memo(function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        <img
          src={`https://flagcdn.com/40x30/${country.emoji.toLowerCase()}.png`}
        />
      </span>
      <span>{country.country}</span>
    </li>
  );
});

export default CountryItem;
