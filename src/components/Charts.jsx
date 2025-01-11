import React, { Component } from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Donut Chart Configuration
      donutOptions: {
        labels: ["A", "B", "C", "D", "E"],
      },
      donutSeries: [44, 55, 41, 17, 15],

      // Line Chart Configuration
      lineOptions: {
        chart: {
          id: "basic-line",
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May"],
        },
      },
      lineSeries: [
        {
          name: "Series 1",
          data: [30, 40, 35, 50, 49],
        },
      ],
    };
  }

  render() {
    return (
      <div className="charts-container">
        {/* Donut Chart */}
        <div className="donut">
          <h2>Donut Chart</h2>
          <Chart
            options={this.state.donutOptions}
            series={this.state.donutSeries}
            type="donut"
            width="380"
          />
        </div>

       </div>
      
    );
  }
}

export default Donut;
