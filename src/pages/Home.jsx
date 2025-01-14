import React from "react";
import Chart from "react-apexcharts";
import StatsCard from "../components/Statscard";

const Home = () => {
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
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        <StatsCard title="Sales" amount="$424,652" chartColor="text-blue-400" />
        <StatsCard title="Expenses" amount="$235,312" chartColor="text-gray-300" />
        <StatsCard title="Profits" amount="$135,965" chartColor="text-blue-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Monthly Sales */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-bold text-gray-800">Monthly Sales</h2>
          <Chart options={monthlySalesOptions} series={monthlySalesSeries} type="bar" height={300} />
        </div>

        {/* Department Sales */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-bold text-gray-800">Department Sales</h2>
          <Chart options={departmentSalesOptions} series={departmentSalesSeries} type="pie" height={300} />
        </div>

        {/* Daily Visits */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-bold text-gray-800">Daily Visits Insights</h2>
          <Chart options={dailyVisitsOptions} series={dailyVisitsSeries} type="area" height={300} />
        </div>

        {/* Customers */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-bold text-gray-800">Customers</h2>
          <Chart options={customersOptions} series={customersSeries} type="line" height={300} />
        </div>
      </div>


      {/* Table */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* First Table */}
  <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
    <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Staff</h2>
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-4">
        <thead className="text-xs text-gray-700 uppercase p-4 bg-gray-50">
          <tr>
            <th scope="col" className="p-4"></th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3">Phone</th>
            <th scope="col" className="px-6 py-3">CNIC</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white">
            <td className="p-4 w-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
              </div>
            </td>
            <td className="px-6 py-4">John Doe</td>
            <td className="px-6 py-4">john@example.com</td>
            <td className="px-6 py-4">Manager</td>
            <td className="px-6 py-4">+123456789</td>
            <td className="px-6 py-4">12345-6789012-3</td>
          </tr>
          <tr className="border-b bg-white">
            <td className="p-4 w-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
              </div>
            </td>
            <td className="px-6 py-4">Jane Doe</td>
            <td className="px-6 py-4">jane@example.com</td>
            <td className="px-6 py-4">Developer</td>
            <td className="px-6 py-4">+987654321</td>
            <td className="px-6 py-4">98765-4321098-7</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  {/* Second Table */}
  <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
    <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Guest</h2>
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-4">
        <thead className="text-xs text-gray-700 uppercase p-4 bg-gray-50">
          <tr>
            <th scope="col" className="p-4"></th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3">Phone</th>
            <th scope="col" className="px-6 py-3">National id</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white">
            <td className="p-4 w-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
              </div>
            </td>
            <td className="px-6 py-4">John Doe</td>
            <td className="px-6 py-4">john@example.com</td>
            <td className="px-6 py-4">Manager</td>
            <td className="px-6 py-4">+123456789</td>
            <td className="px-6 py-4">12345-6789012-3</td>
          </tr>
          <tr className="border-b bg-white">
            <td className="p-4 w-4">
              <div className="flex items-center">
                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
              </div>
            </td>
            <td className="px-6 py-4">Jane Doe</td>
            <td className="px-6 py-4">jane@example.com</td>
            <td className="px-6 py-4">Developer</td>
            <td className="px-6 py-4">+987654321</td>
            <td className="px-6 py-4">98765-4321098-7</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</>


    
  );
};

export default Home;
