import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PageHeader from "../components/shared/PageHeader";
import { useGetSalesQuery } from "../redux/features/sale/saleApi";
import { useEffect, useState } from "react";
import { ISaleInfo } from "../types/saleTypes";
import moment from "moment";
import Loader from "../components/shared/Loader";

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
  const [selectedDays, setSelectedDays] = useState("1");
  const [salesData, setSalesData] = useState([]);
  const { data, isFetching, refetch } = useGetSalesQuery({ days: selectedDays }, { refetchOnMountOrArgChange: true });

  const handleChange = (e: SelectChangeEvent<string>) => {
    const days = parseInt(e.target.value);
    setSelectedDays(days.toString());
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
    }
  }, [data?.content])

  return (
    <>
      <PageHeader title="Sales History">
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
          <MenuItem value="1">Daily</MenuItem>
          <MenuItem value="7">Weekly</MenuItem>
          <MenuItem value="30">Monthly</MenuItem>
          <MenuItem value="365">Yearly</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ width: '100%', bgcolor: "#fff", minHeight: 300, }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            <TableBody sx={{ position: "relative" }}>
              {
                isFetching && <Loader />
              }
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
      </Box>
    </>
  );
};

export default SalesHistory;