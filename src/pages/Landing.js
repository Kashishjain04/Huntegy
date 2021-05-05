import React from "react";
import { Link } from "react-router-dom";
import host from "../assets/host.svg";
import player from "../assets/player.svg";

const Landing = () => {
  return (
    <div className="grid place-items-center grid-cols-1 py-20 sm:grid-cols-2 lg:px-20 h-screen">
      <Link to="/host" className="landing-option">
        <img className="" src={host} alt="vector" />
        <p className="text-2xl font-semibold mt-2">Host</p>
      </Link>
      <Link to="/player" className="landing-option">
        <img className="" src={player} alt="vector" />
        <p className="text-2xl font-semibold mt-2">Player</p>
      </Link>
    </div>
  );
};

export default Landing;
