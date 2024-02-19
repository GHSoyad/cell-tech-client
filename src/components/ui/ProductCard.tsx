import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IProduct } from "../../types/productTypes";
import img from "../../assets/images/product-thumbnail.webp"
import Dropdown from "../shared/Dropdown";

interface IProductCard {
  product: IProduct,
  handleModifyOpen: (id: string, action: string) => void
}


const ProductCard = ({ product, handleModifyOpen }: IProductCard) => {
  const { _id, name, brand, release_date, stock, price, battery_capacity, camera_quality, operating_system, screen_size, storage_capacity } = product;


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
          <Box sx={{ display: "flex", gap: 2, pt: 1, alignItems: "baseline" }}>
            <Typography variant="h6">
              {name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {brand}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, pt: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Released : {release_date}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Price ($) : {price}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Stock : {stock}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              OS : {operating_system}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, pt: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Storage (GB) : {storage_capacity}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Camera (MP) : {camera_quality}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Battery (mAh) : {battery_capacity}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Screen (Inches) : {screen_size}
            </Typography>
          </Box>
        </CardContent>
        <Dropdown
          options={[
            { id: _id, name: "Update", action: handleModifyOpen },
            { id: _id, name: "Delete", action: handleModifyOpen },
            { id: _id, name: "Sell", action: handleModifyOpen },
            { id: _id, name: "Duplicate", action: handleModifyOpen },
          ]}
        />
      </Card>
    </Grid >
  );
};

export default ProductCard;