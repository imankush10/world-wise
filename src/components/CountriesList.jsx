import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

function CountriesList() {
  const { cities } = useCities();
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  const countries = cities.reduce((accm, city) => {
    if (!accm?.some((addedCity) => addedCity.country == city.country))
      accm.push(city);
    return accm;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
