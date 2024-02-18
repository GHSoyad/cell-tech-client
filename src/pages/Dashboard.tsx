import Loader from "../components/shared/Loader";
import { useGetStatisticsQuery } from "../redux/features/statistics/statisticsApi";
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IStat {
  date: string,
  totalAmountSold: number,
}


const Dashboard = () => {
  const [selectedDays, setSelectedDays] = useState("7");
  const { data: statistics, isLoading, refetch } = useGetStatisticsQuery({ days: selectedDays }, { refetchOnMountOrArgChange: true });

  const handleChange = (e: SelectChangeEvent<string>) => {
    const days = parseInt(e.target.value);
    setSelectedDays(days.toString());
    refetch();
  }

  const optionsData = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: (Math.ceil((_.max(_.map((statistics?.content || []), 'totalAmountSold')) || 0) / 100) * 100) + 1000,
      }
    },
  };

  const chartData = {
    labels: (statistics?.content || []).map((stat: IStat) => stat.date),
    datasets: [
      {
        data: (statistics?.content || []).map((stat: IStat) => stat.totalAmountSold),
        borderColor: '#6d0076',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };


  return (
    <div>
      <Typography variant="h5">
        Welcome to Dashboard
      </Typography>

      <FormControl
        margin="normal"
        size="small"
        sx={{ mb: 4 }}
      >
        <InputLabel id="filter-screen">Select Days</InputLabel>
        <Select
          labelId="filter-screen"
          label="Select Days"
          value={selectedDays}
          onChange={handleChange}
        >
          <MenuItem value="7">Weekly</MenuItem>
          <MenuItem value="30">Monthly</MenuItem>
          <MenuItem value="365">Yearly</MenuItem>
        </Select>
      </FormControl>

      <div>
        {
          isLoading ?
            <Loader />
            :
            <Line options={optionsData} data={chartData} />
        }
      </div>
    </div>
  );
};

export default Dashboard;