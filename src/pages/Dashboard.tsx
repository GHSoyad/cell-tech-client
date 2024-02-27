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
import { Box, Card, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import { useGetUsersQuery } from "../redux/features/user/userApi";
import { IUser } from "../types/userTypes";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

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
  const user = useAppSelector(selectCurrentUser);
  const [filter, setFilter] = useState({ days: 30, userId: user?.role?.toLowerCase() === "user" ? user?._id : "" });
  const { data: statistics, isFetching, refetch } = useGetStatisticsQuery({ days: filter?.days, userId: filter?.userId }, { refetchOnMountOrArgChange: true });
  const { data: users } = useGetUsersQuery(undefined);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setFilter(prevData => ({
      ...prevData,
      [name]: name === "days" ? parseInt(value) : value,
    }));
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
      x: {
        ticks: {
          maxTicksLimit: 31
        }
      },
      y: {
        min: 0,
        max: (Math.ceil((_.max(_.map((statistics?.content || []), 'totalAmountSold')) || 0) / 100) * 100) + 500,
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
    <>
      <PageHeader title="Dashboard" />
      <Card sx={{ borderRadius: "10px", p: { xs: 2, md: 3 } }}>
        <FormControl
          margin="normal"
          size="small"
          sx={{ mb: 3, width: 200 }}
        >
          <InputLabel id="select-days">Select Days</InputLabel>
          <Select
            labelId="select-days"
            label="Select Days"
            name="days"
            value={filter.days.toString()}
            onChange={handleChange}
          >
            <MenuItem value="7">Weekly</MenuItem>
            <MenuItem value="30">Monthly</MenuItem>
            <MenuItem value="365">Yearly</MenuItem>
          </Select>
        </FormControl>

        {
          user?.role?.toLowerCase() === "admin" ?
            <FormControl
              margin="normal"
              size="small"
              sx={{ mb: 3, ml: 3, width: 200 }}
            >
              <InputLabel id="select-user">Select User</InputLabel>
              <Select
                labelId="select-user"
                label="Select User"
                name="userId"
                value={filter.userId}
                onChange={handleChange}
              >
                {
                  users?.content?.map((user: IUser) =>
                    <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            :
            null
        }

        <Box sx={{ minHeight: 300, position: "relative" }}>
          {
            isFetching &&
            <Loader />
          }
          <Line options={optionsData} height={350} data={chartData} />
        </Box>
      </Card>
    </>
  );
};

export default Dashboard;