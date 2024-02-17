import { Box, Button, Card, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import ProductCard from "../components/ui/ProductCard"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AddProduct from "../components/ui/AddProduct";


const Products = () => {
  const [open, setOpen] = useState(false);
  const { data: products, isLoading } = useGetProductsQuery(undefined, { refetchOnMountOrArgChange: true });

  const handleClickOpen = () => {
    setOpen(true);
  };


  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Products
        </Typography>
        <Button variant="contained" size="medium" endIcon={<AddIcon />} onClick={handleClickOpen}>
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
                      products?.map(product => (
                        <ProductCard key={product._id} product={product} />
                      ))
                    }
                  </Grid>
              }
            </div>
          </Grid>
        </Grid>
      </Box>

      {
        open ?
          <AddProduct open={open} setOpen={setOpen} />
          :
          null
      }

    </>
  );
};

export default Products;