import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IProduct } from "../../types/productTypes";
import img from "../../assets/images/product-thumbnail.webp"
import Dropdown from "../shared/Dropdown";

interface IProductCard {
  product: IProduct,
  handleModifyOpen: (id: string, action: string) => void
}


const ProductCard = ({ product, handleModifyOpen }: IProductCard) => {
  const { _id, name, brand, stock, price } = product;


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
              Stock : {stock}
            </Typography>
          </Box>
        </CardContent>
        <Dropdown
          options={[
            { id: _id, name: "Update", action: handleModifyOpen },
            { id: _id, name: "Delete", action: handleModifyOpen },
            { id: _id, name: "Sell", action: handleModifyOpen },
          ]}
        />
      </Card>
    </Grid >
  );
};

export default ProductCard;