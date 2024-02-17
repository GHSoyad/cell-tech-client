import { Box, Card, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import ProductCard from "../components/ui/ProductCard";


const Products = () => {

  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <>
      <Typography variant="h4" mb={1}>
        Products
      </Typography>
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

    </>
  );
};

export default Products;