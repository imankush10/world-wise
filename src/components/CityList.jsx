import React from "react";

import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

function CityList() {
  const {cities} = useCities();
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
