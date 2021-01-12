import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import "./Chart.css";

const DaysPicker = ({ handleDaysChange }) => {
  const [numDays, setNumDays] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNumDays([ 240, 120 ,30 ,7]);
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className='formControl'>
      <NativeSelect defaultValue="" onChange={(e) => handleDaysChange(e.target.value)}>
        <option value="360">360 days</option>
        {numDays.map((numDay, i) => <option key={i} value={numDay}>{numDay} days</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default DaysPicker;