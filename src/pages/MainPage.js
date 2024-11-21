import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import "./MainPage.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function to generate random current values (0 to 10 Amps)
function generateRandomData() {
  return Math.random() * 10; // Random current value between 0 and 10 Amps
}

function MainPage() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Current (Amps)",
        data: [],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.4,
      },
    ],
  });

  // Refs to access the chart instances
  const chartRefs = useRef({
    current: null,
    voltage: null,
    energy: null,
    frequency: null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Get the current time (or index) and new random current value
      const currentTime = new Date().toLocaleTimeString();
      const newCurrent = generateRandomData();

      // Update chart data by adding new values
      setChartData((prevData) => {
        const updatedLabels = [...prevData.labels, currentTime];
        const updatedData = [...prevData.datasets[0].data, newCurrent];

        // Limit the data to 10 points for the graph
        if (updatedLabels.length > 10) {
          updatedLabels.shift();
          updatedData.shift();
        }

        return {
          labels: updatedLabels,
          datasets: [
            {
              label: "Current (Amps)",
              data: updatedData,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              tension: 0.4,
            },
          ],
        };
      });
    }, 1000); // Run every second (1000 milliseconds)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)', // Make x-axis grid lines visible
        },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)', // Make y-axis grid lines visible
        },
        min: 0, // Fixed minimum value for y-axis
        max: 10, // Fixed maximum value for y-axis
        title: {
          display: true,
          text: "Current (Amps)",
        },
      },
    },
    elements: {
      line: {
        fill: true, // Ensure the area under the line is filled
        backgroundColor: "rgba(0, 123, 255, 0.2)", // Set background color to prevent transparency
      },
    },
  };

  // Function to save the chart as an image
  const saveGraph = (chartRef) => {
    if (chartRef && chartRef.toBase64Image) {
      const imageUrl = chartRef.toBase64Image();
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "chart.png"; // Default image name
      link.click();
    }
  };

  return (
    <div className="main-page">
      <div className="chart-flex-container">
        {/* Current chart */}
        <div className="chart-container">
          <h3>Current vs Time</h3>
          <Line
            ref={(ref) => (chartRefs.current.current = ref)}
            data={chartData}
            options={options}
          />
          <button onClick={() => saveGraph(chartRefs.current.current)}>
            Save Graph
          </button>
        </div>

        {/* Voltage chart */}
        <div className="chart-container">
          <h3>Voltage vs Time</h3>
          <Line
            ref={(ref) => (chartRefs.current.voltage = ref)}
            data={chartData}
            options={options}
          />
          <button onClick={() => saveGraph(chartRefs.current.voltage)}>
            Save Graph
          </button>
        </div>

        {/* Energy Consumption chart */}
        <div className="chart-container">
          <h3>Energy Consumption vs Time</h3>
          <Line
            ref={(ref) => (chartRefs.current.energy = ref)}
            data={chartData}
            options={options}
          />
          <button onClick={() => saveGraph(chartRefs.current.energy)}>
            Save Graph
          </button>
        </div>

        {/* Frequency chart */}
        <div className="chart-container">
          <h3>Frequency vs Time</h3>
          <Line
            ref={(ref) => (chartRefs.current.frequency = ref)}
            data={chartData}
            options={options}
          />
          <button onClick={() => saveGraph(chartRefs.current.frequency)}>
            Save Graph
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
