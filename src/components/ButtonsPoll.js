import React from 'react';



function ButtonsPoll({handleVoteOne, handleVoteTwo}) {
    
    return (
          <div className="icon-set">
            <div className="vote-icon">
              <button className="btn-info " onClick={handleVoteOne}>
                {" "}
                Yes
              </button>
            </div>
            <div className="vote-icon">
              <button className="btn-danger" onClick={handleVoteTwo}>
                {" "}
                No
              </button>
            </div>
          </div>
        );   
}

export default ButtonsPoll;




  

