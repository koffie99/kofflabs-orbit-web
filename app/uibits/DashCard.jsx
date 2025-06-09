import React from "react";
import CountUp from "react-countup";

const DashCard = ({ Icon, color, desc, value, type }) => {
  let isMoney = type === "money";
  return (
    <div className="bg-[#30508a] flex items-center gap-3 p-6 rounded-lg shadow-2xl">
      <div>{Icon && <Icon className="text-2xl text-white" />}</div>
      <div>
        <h3
          className={`${
            isMoney ? "flex items-center gap-1" : ""
          } text-xl text-white font-bold`}
        >
          {isMoney && <h2>GHS</h2>}
          <CountUp end={value} duration={2.5} separator="," />
        </h3>
        <p className="text-white text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default DashCard;
