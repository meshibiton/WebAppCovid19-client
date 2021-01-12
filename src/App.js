import React, { useState, useEffect } from "react";
import image from "./covid.jpg";
import poll from "./poll.png";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Chart from "./components/Chart";
import Chart2 from "./components/Chart2";
import LineGraph from "./LineGraph";
import Table from "./Table";
import Mainland from "./TableMainland";

import Poll from "./components/Poll";
import { Container, Row, Col } from "reactstrap";
import { prettyPrintStat, syncFunc, notify } from "./util";
import numeral from "numeral";
import Map from "./Map";
import axios from "axios";

import "leaflet/dist/leaflet.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [countVote, setCountVote] = useState([0, 0]);
  const [pollInfo, setPollInfo] = useState({});
  const [show, setShow] = useState(false);
  const [dataPoll, setDataPoll] = useState([]);
  const [numPoll, setNumPoll] = useState({});
  const [sort, setSort] = useState([]);
  const [sortMain, setSortMain] = useState([]);

  useEffect(() => {
    const data = syncFunc("/covid19/all");
    if (data) {
      setCountryInfo(data[0]);
    }else{
      notify()
    }
  }, []);

  useEffect(() => {
    const poll = syncFunc("/ActivePolls");

    if (poll) {
      setDataPoll(poll.polls);
      setNumPoll({ currentPoll: 0, numPolls: poll.num });
      if (poll.num !== 0) {
        setPollInfo(poll.polls[0]);
        setCountVote([poll.polls[0].yes, poll.polls[0].no]);
      }
    }else{
      notify()
    }
    const poll1 = syncFunc("/covid19/countries/sorted");
    if (poll1) {
      setSort(poll1);
    }else{
      notify()
    }
    const mainland = syncFunc("/covid19/mainlandsSorted");
    if (mainland) {
      setSortMain(mainland);
    }else{
      notify()
    }
  }, []);

  useEffect(() => {
    const data = syncFunc("/covid19/countries");
    if (data) {
      const countries = data.map((country) => ({
        name: country.country,
        value: country.value,
      }));
      setCountries(countries);
      setMapCountries(data);
    }else{
      notify()
    }
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide" ? "/covid19/all" : `/covid19/${countryCode}`;
    await axios.get(url).then((data) => {
      setInputCountry(countryCode);
      setCountryInfo(data.data[0]);
      setMapCenter([data.data[0].lat, data.data[0].long]);
      setMapZoom(4);
    }) .catch(error => {
      notify()
   });
  };

  const handleVoteOne = () => {
    let id = pollInfo.id;
    axios.put(`/polls/counter/${id},yes`).then((res) => {
      setCountVote([countVote[0] + 1, countVote[1]]);
      setShow(true);
    }).catch(error => {
      notify()
   });
  };
  const handleVoteTwo = () => {
    let id = pollInfo.id;
    axios.put(`/polls/counter/${id},no`).then((res) => {
      setCountVote([countVote[0], countVote[1] + 1]);
      setShow(true);
    }).catch(error => {
      notify()
   });
  };

  const skipQuestion = (e) => {
    dataPoll[numPoll.currentPoll].yes = countVote[0];
    dataPoll[numPoll.currentPoll].no = countVote[1];
    let newNumPoll =
      numPoll.currentPoll + 1 === numPoll.numPolls
        ? 0
        : numPoll.currentPoll + 1;
    setNumPoll({ currentPoll: newNumPoll, numPolls: numPoll.numPolls });
    setPollInfo(dataPoll[newNumPoll]);
    setCountVote([dataPoll[newNumPoll].yes, dataPoll[newNumPoll].no]);
    setShow(false);
  };
  const getVote = () => {
    return countVote;
  };

  return (
    <div className="app">
      <Container fluid>
        <Row>
          <Col>
            <div className="spliter">
              <div className="app__left">
                <div className="app__header">
                  <h1>COVID-19</h1>
                <ToastContainer />
                  <FormControl className="app__dropdown">
                    <Select
                      variant="outlined"
                      value={country}
                      onChange={onCountryChange}
                    >
                      <MenuItem value="worldwide">Worldwide</MenuItem>
                      {countries.map((country) => (
                        <MenuItem value={country.value}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <p className="left">Date 9/01/2021(last update 9/01/2021)</p>

                <div className="app__stats">
                  <InfoBox
                    onClick={(e) => setCasesType("cases")}
                    title="Coronavirus Cases"
                    isRed
                    active={casesType === "cases"}
                    cases={prettyPrintStat(countryInfo.todayCases)}
                    total={numeral(countryInfo.cases).format("0.0a")}
                    precent={(countryInfo.precentCases * 1).toFixed(2)}
                  />
                  <InfoBox
                    onClick={(e) => setCasesType("deaths")}
                    title="Deaths"
                    active={casesType === "deaths"}
                    cases={prettyPrintStat(countryInfo.todayDeaths)}
                    total={numeral(countryInfo.deaths).format("0.0a")}
                    precent={(countryInfo.precentDeaths * 1).toFixed(2)}
                  />
                </div>
                <Map
                  countries={mapCountries}
                  casesType={casesType}
                  center={mapCenter}
                  zoom={mapZoom}
                />
              </div>

              <Card className="app__right">
                <CardContent>
                  <div className="app__information">
                    <h3>Live Total Cases by Country</h3>
                    <Table countries={sort} />
                    <h3>Worldwide new {casesType}</h3>
                    <LineGraph casesType={casesType} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          <Col>
            <div className="spliter">
              <Card className="app__left">
                <CardContent className="center">
                  <Chart />
                </CardContent>
              </Card>
              <Card className="app__right">
                <CardContent>
                  <div className="app__information">
                    {numPoll.numPolls ? (
                      <Poll
                        countVote={countVote}
                        getVote={getVote}
                        skipQuestion={skipQuestion}
                        handleVoteOne={handleVoteOne}
                        handleVoteTwo={handleVoteTwo}
                        show={show}
                        pollInfo={pollInfo}
                      />
                    ) : (
                      <div>
                        <h3>No polls for today :)</h3>
                      </div>
                    )}
                    {numPoll.numPolls ? (
                      <p>
                        {numPoll.numPolls}/{numPoll.currentPoll + 1}
                      </p>
                    ) : (
                      <div></div>
                    )}
                    <img className="image" src={poll} alt="Poll" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col>
            <div className="spliter">
              <Card className="app__left">
                <CardContent className="center">
                  <Chart2 />
                </CardContent>
              </Card>
              <Card className="app__right">
                <CardContent>
                  <div className="app__information">
                    <h3>Live Total Cases by Mainland</h3>
                    <Mainland mainlands={sortMain} />
                    <img className="image" src={image} alt="COVID-19" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
