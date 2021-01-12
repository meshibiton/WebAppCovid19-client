import React, { useState } from "react";
import axios from "axios";
import {  notify } from "../util";

function Sign({ setSignTrue }) {
  const [details, setDetails] = useState({ userName: "", pass: "" });
  const [showAlert, setshowAlert] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    startCheck(details);
    setDetails({ userName: "", pass: "" });
  };
  const onChange1 = (e) =>
    setDetails({ userName: e.target.value, pass: details.pass });
  const onChange2 = (e) =>
    setDetails({ userName: details.userName, pass: e.target.value });

  const startCheck = () => {
    let obj = { user: `${details.userName}`, password: `${details.pass}` };

    axios.put("/Mangaer", obj)
    .then((res) => {
      if (res.data) {
        setshowAlert(false);
        setSignTrue();
      } else {
        setshowAlert(true);
      }
    }).catch(error => {
      notify()
   });;
  };

  return (
    <div>
      <form style={{ display: "flex" }}>
        <input
          type="text"
          name="title"
          value={details.userName}
          placeholder="User Name..."
          style={{ flex: 10, padding: "5px", marginRight: "5px" }}
          onChange={onChange1}
        />
        <input
          type="text"
          name="pass"
          onChange={onChange2}
          value={details.pass}
          placeholder="Password..."
          style={{ flex: 10, padding: "5px", marginRight: "5px" }}
        />
        <button
          onClick={onSubmit}
          value="Submit"
          className="btn-info"
          style={{ flex: 1 }}
        >
          {" "}
          Submit{" "}
        </button>
      </form>
      {showAlert ? (
        <p style={{ color: "red" }}>
          {" "}
          *try again usernmae or Password incorrect{" "}
        </p>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Sign;
