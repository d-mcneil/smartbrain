import React from "react";

const Rank = ({ userName, userScore, userRank }) => {
  return (
    <>
      <div className="white f3 mt3">{`${userName}, your current score is...`}</div>
      <div className="white f1">{`${userScore}`}</div>
      <div className="white f3">Your rank out of all users is...</div>
      <div className="white f1">{`${userRank}`}</div>
    </>
  );
};

export default Rank;
