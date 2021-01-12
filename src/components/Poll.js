import React from "react";
import Results from "../components/Results";
import ButtonsPoll from "../components/ButtonsPoll";
import Button from "react-bootstrap/Button";

function Poll({ handleVoteOne, handleVoteTwo, countVote, skipQuestion, show, getVote, pollInfo }) {


  const printMessege = (show) => {
    if (show){
      return <Button className="btn-primary"  onClick={skipQuestion}>The Poll Recived!!! Skip Question </Button>
    }else{
      return <Button className="btn-success" onClick={skipQuestion}>Skip Question </Button>
    }
  };

  return (
    <div className="poll">
      <div className="jumbotron" style={{ textAlign: "center" }}>
        <h4>{pollInfo.ques}</h4>
        <br />
        {!show ? <ButtonsPoll  handleVoteOne={handleVoteOne} handleVoteTwo={handleVoteTwo}/>: <div></div>}       
      </div>
      <Results countVote={countVote} getVote={getVote}/>
      {printMessege(show)} 
    </div>
  );
}

export default Poll;
