import { Box, Card, CardContent, CardMedia, Fab, Grid, Typography } from "@mui/material";
import { IProduct } from "../../types/productTypes";
import { MoreVert } from "@mui/icons-material";
import img from "../../assets/images/product-thumbnail.webp"

const ProductCard = ({ product }: { product: IProduct }) => {
  const { name, brand, quantity, price } = product;
  return (
    <Grid item xs={12} >
      <Card sx={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          sx={{ width: 160, py: 1 }}
          image={img}
          alt="product"
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {name}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, pt: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              Brand : {brand}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              Price : ${price}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              Stock : {quantity}
            </Typography>
          </Box>
        </CardContent>
        <Fab variant="circular" size="small" color="primary" sx={{ mr: 2 }}>
          <MoreVert />
        </Fab>
      </Card>
    </Grid >
  );
};

export default ProductCard;