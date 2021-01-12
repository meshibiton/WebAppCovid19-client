import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./Chart.css";
import DaysPicker from "./DaysPicker";
import { syncFunc, notify } from "../util";
import Form from "react-bootstrap/Form";
import ReactTooltip from "react-tooltip";
import { FcInfo } from "react-icons/fc";


const Chart = () => {
  const [dailyData, setDailyData] = useState({});
  const [proportional, setproportional] = useState(false);
  const [dateBefore, setDateBefore] = useState(360);

  useEffect(() => {
    const initialDailyData = fetchDailyData(dateBefore,false);

    if (initialDailyData) {
      setDailyData(initialDailyData);
    }
  }, []);

  const fetchDailyData = (date, check) => {
      const url = check
        ? `/covid19/Graphs/material/prop/${date}`
        : `/covid19/Graphs/material/${date}`;

      const data = syncFunc(url);
      if(data){
      return data.map(({ cases, deaths, date, bitcoin, oil, gas }) => ({
        confirmed: cases,
        deaths,
        date,
        bitcoin,
        oil,
        gas,
      }));
    }else{
      notify()
    }
  };

  const handleDaysChange = (date) => {
    const initialDailyData = fetchDailyData(date, proportional);
    setDailyData(initialDailyData);
    setDateBefore(date)
  };


  const handleModeChange = () => {
    let check = !proportional
    setproportional(check)
    const initialDailyData = fetchDailyData(dateBefore, check);
    setDailyData(initialDailyData);

  };


  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed),
            label: "Cases",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.bitcoin),
            label: "Bitcoin",
            backgroundColor: "rgba(251, 188, 5, 0.5)",
            borderColor: "#FFC300 ",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.oil),
            label: "Oil",
            borderColor: "8BC34A",
            backgroundColor: "rgba(139,195, 74, 0.5)",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.gas),
            label: "Gas",
            borderColor: "rgba(103, 58, 183)",
            backgroundColor: "rgba(103, 58, 183, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <React.Fragment>
      <div className="container">
        <h2 className="colorHeaderP">The Influence Of Covid-19 </h2>
        <Form.Row className="align-items-center">
          <DaysPicker handleDaysChange={handleDaysChange} />
          <Form>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" onChange={handleModeChange} label="proportional mode" />
            </Form.Group>
          </Form>

          <div data-tip="cases- 1:100000 death- 1:4000, bitcon- 1:5000, oil- 1:20">
            {" "}
            <FcInfo style={{ marginBottom: "10px" }} size={24} />
          </div>
          <ReactTooltip place="top" />
        </Form.Row>
        {lineChart}
      </div>
    </React.Fragment>
  );
};

export default Chart;
