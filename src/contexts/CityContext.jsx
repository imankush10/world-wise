/* eslint-disable react/prop-types */
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import cityData from "../constant/cityData";
const CityContext = createContext();

const initialState = {
  cities: localStorage.getItem("cities")
    ? JSON.parse(localStorage.getItem("cities"))
    : cityData.cities,
  currentCity: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        cities: action.payload,
      };
    default:
      throw new Error("Invalid");
  }
}

function CityProvider({ children }) {
  const [{ cities, currentCity }, dispatch] = useReducer(reducer, initialState);

  const idRef = useRef(0);

  function getCity(id) {
    const currentCityVar = cities.find((city) => city.id == id);
    dispatch({ type: "city/loaded", payload: currentCityVar });
  }

  function addCity(city) {
    dispatch({ type: "city/created", payload: city });
  }

  function removeCity(city) {
    const newCities = cities.filter((cty) => cty.id !== city.id);
    dispatch({ type: "city/deleted", payload: newCities });
  }

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  return (
    <CityContext.Provider
      value={{
        cities,
        formatDate,
        getCity,
        addCity,
        removeCity,
        currentCity,
        idRef,
      }}
    >
      <>{children}</>
    </CityContext.Provider>
  );
}

function useCities() {
  return useContext(CityContext);
}

export { CityProvider, useCities };
