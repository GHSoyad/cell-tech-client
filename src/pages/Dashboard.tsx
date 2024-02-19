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
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import PageHeader from "../components/shared/PageHeader";

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
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 31
        }
      },
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
        borderColor: '#1976d2',
        backgroundColor: '#1976d280',
      }
    ],
  };


  return (
    <div>
      <PageHeader title="Dashboard">
      </PageHeader>

      <FormControl
        margin="normal"
        size="small"
        sx={{ mb: 4, width: 200 }}
      >
        <InputLabel id="select-days">Select Days</InputLabel>
        <Select
          labelId="select-days"
          label="Select Days"
          value={selectedDays}
          onChange={handleChange}
        >
          <MenuItem value="7">Weekly</MenuItem>
          <MenuItem value="30">Monthly</MenuItem>
          <MenuItem value="365">Yearly</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ maxHeight: 500 }}>
        {
          isLoading ?
            <Loader />
            :
            <Line options={optionsData} data={chartData} />
        }
      </Box>
    </div>
  );
};

export default Dashboard;