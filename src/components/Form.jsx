// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { React, useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CityContext";
import { useNavigate } from "react-router-dom";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const [mapLat, mapLng] = useUrlPosition();
  const [cityIsLoading, setCityisLoading] = useState(false);
  const { addCity, idRef } = useCities();
  
  useEffect(() => {
    async function fetchData() {
      try {
        setGeoCodingError("");
        setCityisLoading(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("That doesn't seem to be a country💀");
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (err) {
        setGeoCodingError(err.message);
      } finally {
        setCityisLoading(false);
      }
    }
    if (mapLat && mapLng) fetchData();
  }, [mapLat, mapLng]);

  function handleSubmit(e) {
    if (!cityName && !country) return;
    idRef.current += 1;
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
      id: idRef.current,
    };
    addCity(newCity);
    navigate("/app/cities");
  }

  if (cityIsLoading) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere on the map" />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <img src={`https://flagcdn.com/24x18/${emoji.toLowerCase()}.png`} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
