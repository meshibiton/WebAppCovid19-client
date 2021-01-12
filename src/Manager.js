

import React, { useState } from "react";

import "./App.css";
import Sign from "./components/Sign";
import Manager1 from "./Manager1";
const Manager = () => {
  const [state, setState] = useState(false);

  const setSignTrue = () => {
    setState(true)
  };

  return (
<div className="container">

<br />
{state ? <Manager1 /> : <Sign setSignTrue={setSignTrue} />}
</div> 
  );
}

export default Manager;
