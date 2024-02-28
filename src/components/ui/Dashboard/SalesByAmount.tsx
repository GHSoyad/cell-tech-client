import { useGetSalesByAmountQuery } from "../../../redux/features/statistics/statisticsApi";
import { Box, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Loader from '../../shared/Loader';
import _ from 'lodash';
import { useEffect } from "react";

interface IStat {
  date: string,
  totalAmountSold: number,
}


const SalesByAmount = ({ filter }: { filter: { days: number, userId: string } }) => {
  const { data: statistics, isFetching, refetch } = useGetSalesByAmountQuery({ days: filter?.days, userId: filter?.userId }, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    refetch()
  }, [filter, refetch])

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
      <Typography variant="h5" sx={{ fontWeight: "500", mb: 2 }}>
        Sales By Amount
      </Typography>
      <Box sx={{ minHeight: 300, position: "relative" }}>
        {
          isFetching &&
          <Loader />
        }
        <Line options={optionsData} height={350} data={chartData} />
      </Box>
    </>
  );
};

export default SalesByAmount;