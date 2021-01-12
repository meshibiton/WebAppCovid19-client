import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import "./Chart.css";
import { syncFunc, notify } from "../util";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const dataCountry = syncFunc(`/covid19/Graphs/finance/countries`);
    if (dataCountry) {
      setCountries(dataCountry);
    } else {
      notify();
    }
  }, []);

  return (
    <FormControl className="formControl">
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        {/* <option value="United States of America">United States of America</option> */}
        {countries.map((country, i) => (
          <option key={i} value={country.value}>
            {country.country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
