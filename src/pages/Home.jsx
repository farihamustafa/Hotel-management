import React, { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi"; // Importing moon and sun icons

import Chart from "react-apexcharts";
import StatsCard from "../components/Statscard";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const monthlySalesOptions = {
    chart: {
      id: "monthly-sales",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    },
  };

  const monthlySalesSeries = [
    {
      name: "Clothing",
      data: [40, 60, 35, 50, 49, 60, 70, 91, 125],
    },
    {
      name: "Food Products",
      data: [20, 30, 15, 40, 39, 20, 50, 61, 75],
    },
  ];

  const departmentSalesOptions = {
    labels: ["Clothing", "Food Products", "Electronics", "Kitchen Utility", "Gardening"],
  };

  const departmentSalesSeries = [44, 55, 13, 43, 22];

  const dailyVisitsOptions = {
    chart: {
      id: "daily-visits",
    },
    xaxis: {
      categories: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
    },
  };

  const dailyVisitsSeries = [
    {
      name: "Day Time",
      data: [5, 7, 12, 9, 7, 5, 3],
    },
    {
      name: "Night Time",
      data: [2, 4, 6, 5, 4, 3, 2],
    },
  ];

  const customersOptions = {
    chart: {
      id: "customers",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const customersSeries = [
    {
      name: "Day Time",
      data: [30, 40, 45, 50, 49, 60, 70],
    },
    {
      name: "Night Time",
      data: [20, 30, 35, 40, 39, 50, 60],
    },
  ];

  return (
    <div
      className={`min-h-screen p-6 ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-3 rounded-full bg-gray-400 text-white inline-flex items-center"
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        <StatsCard title="Sales" amount="$424,652" chartColor="text-blue-400" />
        <StatsCard title="Expenses" amount="$235,312" chartColor="text-gray-300" />
        <StatsCard title="Profits" amount="$135,965" chartColor="text-blue-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Monthly Sales */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className={`text-lg font-bold ${darkMode ? "text-gray-800" : "text-gray-800"}`}>Monthly Sales</h2>
          <Chart options={monthlySalesOptions} series={monthlySalesSeries} type="bar" height={300} />
        </div>

        {/* Department Sales */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className={`text-lg font-bold ${darkMode ? "text-gray-800" : "text-gray-800"}`}>Department Sales</h2>
          <Chart options={departmentSalesOptions} series={departmentSalesSeries} type="pie" height={300} />
        </div>

        {/* Daily Visits */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className={`text-lg font-bold ${darkMode ? "text-gray-800" : "text-gray-800"}`}>Daily Visits Insights</h2>
          <Chart options={dailyVisitsOptions} series={dailyVisitsSeries} type="area" height={300} />
        </div>

        {/* Customers */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className={`text-lg font-bold ${darkMode ? "text-gray-800" : "text-gray-800"}`}>Customers</h2>
          <Chart options={customersOptions} series={customersSeries} type="line" height={300} />
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4 p-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-4 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase p-4 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
             
              </th>
              <th scope="col" className="px-6 py-3">Product name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Sales</th>
              <th scope="col" className="px-6 py-3">Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="p-4 w-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    src="https://flowbite.com/docs/images/products/apple-watch.png"
                    className="w-10 h-10 rounded-full"
                    alt="Apple Watch"
                  />
                  <span className="flex flex-col">
                    <span className="font-semibold">Apple Watch</span>
                    <span className="text-gray-500 dark:text-gray-400">Wireless</span>
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">August 14, 2023</td>
              <td className="px-6 py-4">5,000</td>
              <td className="px-6 py-4">1,000</td>
            </tr>
            <tr className="border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="p-4 w-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    src="https://flowbite.com/docs/images/products/apple-watch.png"
                    className="w-10 h-10 rounded-full"
                    alt="Apple Watch"
                  />
                  <span className="flex flex-col">
                    <span className="font-semibold">Apple Watch</span>
                    <span className="text-gray-500 dark:text-gray-400">Wireless</span>
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">August 14, 2023</td>
              <td className="px-6 py-4">5,000</td>
              <td className="px-6 py-4">1,000</td>
            </tr>
            <tr className="border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="p-4 w-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    src="https://flowbite.com/docs/images/products/apple-watch.png"
                    className="w-10 h-10 rounded-full"
                    alt="Apple Watch"
                  />
                  <span className="flex flex-col">
                    <span className="font-semibold">Apple Watch</span>
                    <span className="text-gray-500 dark:text-gray-400">Wireless</span>
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">August 14, 2023</td>
              <td className="px-6 py-4">5,000</td>
              <td className="px-6 py-4">1,000</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
