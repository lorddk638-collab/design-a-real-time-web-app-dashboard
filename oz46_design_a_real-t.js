// oz46_design_a_real-t.js

// Importing required libraries
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

// Dashboard component
function Dashboard() {
  const [data, setData] = useState({
    // Sample data for testing
    series: [{
      name: 'Sales',
      data: [31, 40, 28, 51, 42, 109, 100]
    }],
    options: {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Real-time Sales Dashboard',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'HH:mm:ss'
        }
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    }
  });

  // Fetching real-time data from API
  useEffect(() => {
    axios.get('https://api.example.com/sales-data')
      .then(response => {
        const newData = response.data;
        setData(prevState => ({
          ...prevState,
          series: [...prevState.series, { data: newData }]
        }));
      })
      .catch(error => console.error(error));
  }, [setData]);

  return (
    <div className="dashboard">
      <Chart options={data.options} series={data.series} type="area" height={350} />
    </div>
  );
}

export default Dashboard;