import React from 'react';
import Chart from 'react-apexcharts';

const CustomersChart = () => {
  const options = {
    chart: {
      type: 'line',
      height: 300,
      toolbar: { show: false },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    colors: ['#42A5F5', '#66BB6A'],
    stroke: {
      width: 3,
      curve: 'smooth',
    },
  };

  const series = [
    { name: 'Day Time', data: [120, 140, 150, 160, 170, 180, 190] },
    { name: 'Night Time', data: [100, 120, 130, 140, 150, 160, 170] },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Customers</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 text-center my-4">168,215</h3>
      <Chart options={options} series={series} type="line" height={250} />
    </div>
  );
};

export default CustomersChart;
