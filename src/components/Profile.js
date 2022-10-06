import React from "react";
import Rank from "./Rank";

const Profile = ({ user, onDeleteUser, error }) => {
  return (
    <>
      <Rank userName={user.name} userScore={user.score} userRank={user.rank} />
      <div className="f3 mt3">{`Joined SmartBrain: ${user.joined
        .replace("T", " ")
        .replace("Z", " UTC")}`}</div>
      <div className="f3 mt3">{`Email: ${user.email}`}</div>
      <p className="f3 link black underline mt4">
        <span onClick={() => onDeleteUser(user.email)} className="dim pointer">
          Delete User
        </span>
        <br></br>CAUTION: IF YOUR CLICK THIS, IT CAN'T BE UNDONE
      </p>
      {error ? (
        <div className="lh-copy mt3">
          <p className="b mb0 f6 pt2 link black db">{error}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
