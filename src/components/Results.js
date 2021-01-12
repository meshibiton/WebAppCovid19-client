import React from "react";

import {
  votesOneInPercent,
  votesOneInPercentStyle,
  votesTwoInPercent,
  votesTwoInPercentStyle,
} from "../util";

function Results({ getVote }) {
  let vote = getVote();

  return (
    <div className="results-wrapper">
      <span className="label">
        Yes: {votesOneInPercent(vote).toFixed(0) + "%"}
      </span>
      <div className="progress">
        <div
          className="progress-bar thor-color"
          style={votesOneInPercentStyle(vote)}
        ></div>
      </div>
      <span className="label">
        No: {votesTwoInPercent(vote).toFixed(0) + "%"}
      </span>
      <div className="progress">
        <div
          className="progress-bar cap-color"
          style={votesTwoInPercentStyle(vote)}
        ></div>
      </div>
      <div>
        <p>{vote[0] + vote[1]} voted</p>
      </div>
    </div>
  );
}

export default Results;
