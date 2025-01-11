import React from "react";
import PropTypes from "prop-types";

const StatsCard = ({ title, amount, chartColor }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800">{amount}</h2>
      <p className="text-gray-500">{title}</p>
      <div className="mt-auto">
        <svg
          className={`w-full h-16 ${chartColor}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 30"
          fill="none"
          stroke="currentColor"
        >
          <path d="M0,20 C10,10 20,25 30,15 C40,5 50,20 60,10 C70,20 80,15 100,20" />
        </svg>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  chartColor: PropTypes.string.isRequired,
};

export default StatsCard;
