import React from 'react';
import Chart from 'react-apexcharts';

const DailyVisitsChart = () => {
  const options = {
    chart: {
      type: 'area',
      height: 300,
      toolbar: { show: false },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    colors: ['#FFA726', '#66BB6A', '#42A5F5'],
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };

  const series = [
    { name: 'Day 1', data: [3, 6, 8, 7, 10, 6, 4] },
    { name: 'Day 2', data: [4, 7, 9, 8, 12, 7, 5] },
    { name: 'Day 3', data: [2, 5, 7, 6, 8, 5, 3] },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Daily Visits Insights</h2>
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
      <Chart options={options} series={series} type="area" height={250} />
    </div>
  );
};

export default DailyVisitsChart;
