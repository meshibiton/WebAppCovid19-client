import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { toast } from 'react-toastify';

export const notify = () => toast.error("Warning notification!!! Something went wrong",{position:toast.POSITION.BOTTOM_LEFT})

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};



export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.lat, country.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType])/4 * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));



  export const votesOneInPercent = (votes) =>{
    if(votes[0]||votes[1]){
      return( votes[0] / (votes[0] + votes[1])) * 100 
    }else{
      return 0
    }

    };
  export const votesTwoInPercent =(votes) =>{
    if(votes[0]||votes[1]){
      return (votes[1] / (votes[0] + votes[1])) * 100 
    }else{
      return 0
    }
  };

  export const votesOneInPercentStyle = (stat) =>{
    return {
      width: votesOneInPercent(stat)+'%'
    }
  };
  export const votesTwoInPercentStyle = (stat) =>{
    return {
      width: votesTwoInPercent(stat)+'%'
    }
  };



 export const syncFunc = (url) => {
    var request = new XMLHttpRequest();
    request.open("GET", `${url}`, false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
      return JSON.parse(request.response);
    }

    return false;
  };

