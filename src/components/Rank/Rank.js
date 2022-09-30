import React from "react";

const Rank = ({ userName, userScore }) => {
  return (
    <>
      <div className="white f3">{`${userName}, your current score is...`}</div>
      <div className="white f1">{userScore}</div>
    </>
  );
};

export default Rank;
