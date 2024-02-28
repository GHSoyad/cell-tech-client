import { Box, Button, Card, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PageHeader from "../components/shared/PageHeader";
import { useDeleteBulkProductsMutation, useGetProductsQuery } from "../redux/features/product/productApi";
import { useEffect, useState } from "react";
import { IProduct } from "../types/productTypes";
import Loader from "../components/shared/Loader";
import DeleteIcon from '@mui/icons-material/Delete';
import toast from "react-hot-toast";

interface ITableProps {
  sno: number,
  id: string,
  name: string,
  brand: string,
  model: string,
  price: number,
  stock: number,
  sold: number,
  status: string,
}


const Inventory = () => {
  const { data, isFetching } = useGetProductsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteProducts, { isLoading }] = useDeleteBulkProductsMutation();
  const [productsData, setProductsData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  // const [selectAllProducts, setSelectAllProducts] = useState(false);

  useEffect(() => {
    if (data?.content?.length) {
      const rows = data?.content?.map((product: IProduct, index: number) => ({
        sno: index + 1,
        id: product._id,
        name: product?.name,
        brand: product.brand,
        model: product.model,
        price: product.price,
        stock: product.stock,
        sold: product.sold,
        status: product?.status ? "Active" : "Inactive",
      }))

      setProductsData(rows);
    }
  }, [data?.content])

  const handleRowSelect = (checked: boolean, id: string) => {
    const existingRows = new Set(selectedProducts);
    checked ? existingRows.add(id) : existingRows.delete(id);
    setSelectedProducts(existingRows);
  }

  const handleDelete = async () => {
    const deletedProductList = Array.from(selectedProducts);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await deleteProducts(deletedProductList);

    if (data?.data?.success) {
      toast.success(data?.data?.message);
      setSelectedProducts(new Set())
    }
    else {
      toast.error(data?.error?.data?.message || "Something unexpected has happened!");
    }
  }


  return (
    <>
      <PageHeader title="Inventory" />
      <Card sx={{ borderRadius: "10px", p: { xs: 2, md: 3 }, minHeight: "calc(100vh - 178px)", position: "relative" }}>
        <Box sx={{ textAlign: "end", mb: 2 }}>
          <Button
            variant="contained"
            size="medium"
            endIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={!selectedProducts.size || isLoading}
          >
            Bulk Delete
          </Button>
        </Box>

        <>
          {
            (isFetching || isLoading) ?
              <Loader />
              :
              productsData?.length ?
                <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 278px)" }}>
                  <Table stickyHeader size="small" aria-label="inventory table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>No.</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Brand</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Model</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Price</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Stock</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Sold</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Select</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        productsData.map((row: ITableProps) => (
                          <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover
                          >
                            <TableCell>{row.sno}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.brand}</TableCell>
                            <TableCell>{row.model}</TableCell>
                            <TableCell align="center">{row.price}</TableCell>
                            <TableCell align="center">{row.stock}</TableCell>
                            <TableCell align="center">{row.sold}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center"><Checkbox size="small" checked={selectedProducts.has(row.id)} onChange={(e) => handleRowSelect(e.target.checked, row.id)} sx={{ p: .5 }} /></TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                :
                <Typography variant="h6" sx={{ p: 3, textAlign: "center" }}>
                  No Data Found
                </Typography>
          }
        </>
      </Card>
    </>
  );
};

export default Inventory;