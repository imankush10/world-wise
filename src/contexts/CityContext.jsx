/* eslint-disable react/prop-types */
import React, {
  createContext,
  useCallback,
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

  const getCity = useRef((id) => {
    const currentCityVar = cities.find((city) => city.id == id);
    dispatch({ type: "city/loaded", payload: currentCityVar });
  }).current;

  const addCity = useCallback((city) => {
    dispatch({ type: "city/created", payload: city });
  }, []);

  const removeCity = useCallback(
    (city) => {
      const newCities = cities.filter((cty) => cty.id !== city.id);
      dispatch({ type: "city/deleted", payload: newCities });
    },
    [cities]
  );

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const formatDate = useCallback(
    (date) =>
      new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date)),
    []
  );

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
