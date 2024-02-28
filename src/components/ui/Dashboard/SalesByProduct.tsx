import { Box, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import Loader from '../../shared/Loader';
import { useGetSalesByProductQuery } from '../../../redux/features/statistics/statisticsApi';
import { useEffect } from 'react';
import { stringToColor } from '../../../utils/stringToColor';

interface IStat {
  product: string,
  quantitySold: number,
}


const SalesByProduct = ({ filter }: { filter: { days: number, userId: string } }) => {
  const { data: statistics, isFetching, refetch } = useGetSalesByProductQuery({ days: filter?.days, userId: filter?.userId }, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    refetch()
  }, [filter, refetch])

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
  };

  const data = {
    labels: (statistics?.content || [])?.map((stat: IStat) => stat?.product),
    datasets: [
      {
        label: 'Quantity Sold',
        data: (statistics?.content || [])?.map((stat: IStat) => stat?.quantitySold),
        backgroundColor: (statistics?.content || []).map((stat: IStat) => stringToColor(stat?.product, 0.3)),
        borderColor: (statistics?.content || []).map((stat: IStat) => stringToColor(stat?.product, 1)),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "500", mb: 4 }}>
        Sales By Product
      </Typography>
      <Box sx={{ minHeight: 300, maxWidth: "40%", position: "relative" }}>
        {
          isFetching &&
          <Loader />
        }
        <Doughnut data={data} options={optionsData} />
      </Box>
    </>
  );
};

export default SalesByProduct;