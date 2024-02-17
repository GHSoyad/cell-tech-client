import { Box, Button, Card, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import ProductCard from "../components/ui/ProductCard"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AddProduct from "../components/ui/AddProduct";
import UpdateProduct from "../components/ui/UpdateProduct";
import { IProduct } from "../types/productTypes";
import DeleteProduct from "../components/ui/DeleteProduct";
import SellProduct from "../components/ui/SellProduct";


const Products = () => {
  const { data: products, isLoading } = useGetProductsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [modifyProduct, setModifyProduct] = useState<IProduct>();

  const handleAddOpen = () => {
    setOpenAddModal(true);
  };

  const handleModifyOpen = (id: string, action: string) => {
    const findProduct = products?.find(product => product._id === id);
    setModifyProduct(findProduct);

    if (action.toLowerCase() === "update") {
      setOpenUpdateModal(true);
    }
    else if (action.toLowerCase() === "delete") {
      setOpenDeleteModal(true);
    }
    else if (action.toLowerCase() === "sell") {
      setOpenSellModal(true);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Products
        </Typography>
        <Button variant="contained" size="medium" endIcon={<AddIcon />} onClick={handleAddOpen}>
          New Product
        </Button>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columnSpacing={[2, 3]} mt={1}>
          <Grid item xs={3} >
            <Card sx={{ borderRadius: "10px", minHeight: "calc(100vh - 188px)" }}></Card>
          </Grid>
          <Grid item xs={9} sx={{ position: "relative" }}>
            <div className="border" style={{ borderRadius: "10px", padding: "8px", minHeight: "calc(100vh - 188px)" }}>
              {
                isLoading ?
                  <CircularProgress sx={{ position: "absolute", top: "20%", left: "50%" }} />
                  :
                  <Grid container rowSpacing={[1, 2]} sx={{ position: "relative" }}>
                    {
                      (products as IProduct[])?.reduce((acc: JSX.Element[], product: IProduct) => {
                        if (product.status || product.stock > 0) {
                          acc.push(<ProductCard key={product._id} product={product} handleModifyOpen={handleModifyOpen} />);
                        }
                        return acc;
                      }, [])
                    }
                  </Grid>
              }
            </div>
          </Grid>
        </Grid>
      </Box>

      {
        openAddModal ?
          <AddProduct open={openAddModal} setOpen={setOpenAddModal} />
          :
          null
      }
      {
        openUpdateModal ?
          <UpdateProduct open={openUpdateModal} setOpen={setOpenUpdateModal} modifyProduct={modifyProduct} />
          :
          null
      }
      {
        openDeleteModal ?
          <DeleteProduct open={openDeleteModal} setOpen={setOpenDeleteModal} modifyProduct={modifyProduct} />
          :
          null
      }
      {
        openSellModal ?
          <SellProduct open={openSellModal} setOpen={setOpenSellModal} modifyProduct={modifyProduct} />
          :
          null
      }
    </>
  );
};

export default Products;