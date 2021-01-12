import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import "./Chart.css";
// import { dataF } from './data2';
import   DaysPicker  from './DaysPicker2';
import   CountryPicker  from './CountryPicker';
import   {syncFunc, notify}  from '../util';
import Form from "react-bootstrap/Form";
import ReactTooltip from "react-tooltip";
import { FcInfo } from "react-icons/fc";

const Chart = () => {
  const [dailyData, setDailyData] = useState({});
  const [dateAndCountry, setDateAndCountry] = useState([360,11]);
  const [proportional, setproportional] = useState(false);

  useEffect(() => {
      const initialDailyData = fetchDailyData([360, 11],proportional);
    if(initialDailyData){
      setDailyData(initialDailyData);

    }
    
  }, []);


 const fetchDailyData = (date, check) => {
   
  const url = check
  ? `/covid19/Graphs/finance/prop/${date[0]},${date[1]}`
  : `/covid19/Graphs/finance/${date[0]},${date[1]}`;

      const  data  = syncFunc(url);
      if(data){
      return data
      }else{
        notify()
      }
   
      
    
  
  };

  const handleCountryChange =  (country) => {


    setDateAndCountry([dateAndCountry[0], country])
    const initialDailyData =  fetchDailyData([dateAndCountry[0], country], proportional);
    setDailyData(initialDailyData);

  }

  const   handleDaysChange =  (date) => {
    setDateAndCountry([ date, dateAndCountry[1]])
    const initialDailyData =  fetchDailyData([date ,dateAndCountry[1]],proportional);
    setDailyData(initialDailyData);

  }


  const handleModeChange = () => {
    let check = !proportional
    setproportional(check)
    const initialDailyData = fetchDailyData(dateAndCountry, check);
    setDailyData(initialDailyData);

  };

  const lineChart = (
    dailyData[0] ? (
      
        <Line
        data={{
          labels: dailyData.map(({date} ) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map((data) => data.cases),
            label: 'Cases',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }, 
          //  {
          //   data: dailyData.map((data) => data.recovered),
          //   label: 'Recovered',
          //   borderColor: 'green',
          //   backgroundColor: 'rgba(0, 255, 0, 0.5)',
          //   fill: true,
          // },


          {
            data: dailyData.map((data) => data.unemployment),
            label: 'Unemployment',
            backgroundColor: 'rgba(251, 188, 5, 0.5)',
            borderColor: '#FFC300 ',
            fill: true,
          }, {
            data: dailyData.map((data) => data.finance),
            label: "State Economy",
            borderColor: '8BC34A',
            backgroundColor: 'rgba(139,195, 74, 0.5)',
            fill: true,
          }
          ],
        }}
      />
    ) : null
  );



  return (
    <React.Fragment>



    <div className='container'>
    <h2 className='colorHeaderP'>The Finance Influence Of Covid-19 Per Country </h2>

    <Form.Row className="align-items-center">
        <DaysPicker handleDaysChange={handleDaysChange} />
        <CountryPicker handleCountryChange={handleCountryChange} />
          <Form>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" onChange={handleModeChange} label="proportional mode" />
            </Form.Group>
          </Form>

          <div data-tip="cases- 1:10000 death- 1:2000, State Economy- 1:20">
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
