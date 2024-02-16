import { Box, Divider, Grid, Typography } from "@mui/material";


const Products = () => {
  return (
    <>
      <Typography variant="h4" mb={1}>
        Products
      </Typography>
      <Divider />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columnSpacing={[2, 4]} mt={1} minHeight={"calc(100vh - 180px)"}>
          <Grid item xs={4}>
            <Grid bgcolor={"red"}>
              test
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid bgcolor={"red"}>

            </Grid>
          </Grid>
        </Grid>
      </Box>

    </>
  );
};

export default Products;