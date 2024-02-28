import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
import SalesByAmount from "../components/ui/Dashboard/SalesByAmount";
import SalesByProduct from "../components/ui/Dashboard/SalesByProduct";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const [filter, setFilter] = useState({ days: 30, userId: user?.role?.toLowerCase() === "user" ? user?._id : "" });
  const { data: users } = useGetUsersQuery(undefined);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setFilter(prevData => ({
      ...prevData,
      [name]: name === "days" ? parseInt(value) : value,
    }));
  }

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

        <SalesByAmount filter={filter} />

        <Box sx={{ mt: 6 }}>
          <SalesByProduct filter={filter} />

        </Box>

      </Card >
    </>
  );
};

export default Dashboard;