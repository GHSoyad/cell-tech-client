import { Box, Card, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PageHeader from "../components/shared/PageHeader";
import { useGetSalesQuery } from "../redux/features/sale/saleApi";
import { useEffect, useState } from "react";
import { ISaleInfo } from "../types/saleTypes";
import moment from "moment";
import Loader from "../components/shared/Loader";
import { useGetUsersQuery } from "../redux/features/user/userApi";
import { IUser } from "../types/userTypes";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

interface ITableProps {
  sno: number,
  id: string,
  product?: string,
  quantity: number,
  price: number,
  totalAmount: number,
  saleDate: string,
  buyer: string,
  seller?: string,
}


const SalesHistory = () => {
  const user = useAppSelector(selectCurrentUser);
  const [filter, setFilter] = useState({ days: 30, userId: user?.role?.toLowerCase() === "user" ? user?._id : "" });
  const [salesData, setSalesData] = useState([]);
  const { data, isFetching, refetch } = useGetSalesQuery({ days: filter?.days, userId: filter?.userId }, { refetchOnMountOrArgChange: true });
  const { data: users } = useGetUsersQuery(undefined);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setFilter(prevData => ({
      ...prevData,
      [name]: name === "days" ? parseInt(value) : value,
    }));
    refetch();
  }

  useEffect(() => {
    if (data?.content?.length) {
      const rows = data?.content?.map((sale: ISaleInfo, index: number) => ({
        sno: index + 1,
        id: sale._id,
        product: sale?.product?.name,
        quantity: sale.quantitySold,
        price: sale.sellPrice,
        totalAmount: sale.totalAmount,
        saleDate: sale.dateSold,
        buyer: sale.buyerName,
        seller: sale?.seller?.name,
      }))

      setSalesData(rows);
    } else {
      setSalesData([])
    }
  }, [data?.content])


  return (
    <>
      <PageHeader title="Sales History" />
      <Card sx={{ borderRadius: "10px", p: { xs: 2, md: 3 }, minHeight: "calc(100vh - 178px)" }}>
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
            <MenuItem value="1">Daily</MenuItem>
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

        <Box component={Paper} sx={{ width: '100%', position: "relative" }}>
          {
            isFetching && <Loader />
          }
          {
            salesData?.length ?
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell align="right">Product</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Total Amount</TableCell>
                      <TableCell align="right">Sale Date</TableCell>
                      <TableCell align="right">Buyer</TableCell>
                      <TableCell align="right">Seller</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesData.map((row: ITableProps) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        hover
                      >
                        <TableCell>{row.sno}</TableCell>
                        <TableCell align="right">{row.product}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.totalAmount}</TableCell>
                        <TableCell align="right">{moment(row.saleDate).format("DD-MM-YYYY")}</TableCell>
                        <TableCell align="right">{row.buyer}</TableCell>
                        <TableCell align="right">{row.seller}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              :
              <Typography variant="h6" sx={{ p: 3, textAlign: "center" }}>
                No Data Found
              </Typography>
          }
        </Box>
      </Card>
    </>
  );
};

export default SalesHistory;