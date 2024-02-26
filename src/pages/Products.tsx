import { Box, Button, Card, CircularProgress, Grid } from "@mui/material";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import ProductCard from "../components/ui/ProductCard"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import AddProduct from "../components/ui/AddProduct";
import UpdateProduct from "../components/ui/UpdateProduct";
import { IProduct } from "../types/productTypes";
import DeleteProduct from "../components/ui/DeleteProduct";
import SellProduct from "../components/ui/SellProduct";
import ProductsFilter from "../components/ui/ProductsFilter";
import moment from "moment";
import PageHeader from "../components/shared/PageHeader";
import DuplicateProduct from "../components/ui/DuplicateProduct";


const Products = () => {
  const { data: products, isFetching } = useGetProductsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [openDuplicateModal, setOpenDuplicateModal] = useState(false);
  const [modifyProduct, setModifyProduct] = useState<IProduct>();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | undefined>([]);
  const [filter, setFilter] = useState({
    price: 0,
    released_after: "",
    released_before: "",
    brand: "",
    model: "",
    operating_system: "",
    storage_capacity: "",
    screen_size: "",
    camera_quality: "",
    battery_capacity: "",
  });

  const handleAddOpen = () => {
    setOpenAddModal(true);
  };

  const handleModifyOpen = (id: string, action: string) => {
    const findProduct = products?.content?.find((product: IProduct) => product._id === id);
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
    else if (action.toLowerCase() === "duplicate") {
      setOpenDuplicateModal(true);
    }
  };

  useEffect(() => {
    let productsList = products?.content;

    if (filter.price) {
      productsList = productsList?.filter((product: IProduct) => product.price <= filter.price);
    }
    if (filter.released_after) {
      productsList = productsList?.filter((product: IProduct) => moment(product.release_date).isAfter(filter.released_after));
    }
    if (filter.released_before) {
      productsList = productsList?.filter((product: IProduct) => moment(product.release_date).isBefore(filter.released_before));
    }
    if (filter.brand) {
      productsList = productsList?.filter((product: IProduct) => product.brand.toLowerCase().trim().includes(filter.brand.toLowerCase().trim()));
    }
    if (filter.model) {
      productsList = productsList?.filter((product: IProduct) => product.model.toLowerCase().trim().includes(filter.model.toLowerCase().trim()));
    }
    if (filter.operating_system) {
      productsList = productsList?.filter((product: IProduct) => product.operating_system.toLowerCase().trim().includes(filter.operating_system.toLowerCase().trim()));
    }
    if (filter.storage_capacity) {
      productsList = productsList?.filter((product: IProduct) => product.storage_capacity >= Number(filter.storage_capacity));
    }
    if (filter.screen_size) {
      productsList = productsList?.filter((product: IProduct) => product.screen_size >= Number(filter.screen_size));
    }
    if (filter.camera_quality) {
      productsList = productsList?.filter((product: IProduct) => product.camera_quality >= Number(filter.camera_quality));
    }
    if (filter.battery_capacity) {
      productsList = productsList?.filter((product: IProduct) => product.battery_capacity >= Number(filter.battery_capacity));
    }

    setFilteredProducts(productsList);
  }, [products?.content, filter])


  return (
    <>
      <PageHeader title="Products" />
      <Card sx={{ borderRadius: "10px", p: { xs: 2, md: 3 } }}>
        <Box sx={{ textAlign: "end", mb: 2 }}>
          <Button variant="contained" size="medium" endIcon={<AddIcon />} onClick={handleAddOpen}>
            New Product
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columnSpacing={[2, 3]}>
            <Grid item xs={3} >
              <ProductsFilter filter={filter} setFilter={setFilter} />
            </Grid>
            <Grid item xs={9} sx={{ position: "relative" }}>
              {
                isFetching ?
                  <CircularProgress sx={{ position: "absolute", top: "20%", left: "50%" }} />
                  :
                  <Grid container rowSpacing={[1, 2]} sx={{ position: "relative" }}>
                    {
                      filteredProducts?.reduce((acc: JSX.Element[], product: IProduct) => {
                        if (product.status || product.stock > 0) {
                          acc.push(
                            <ProductCard key={product._id} product={product} handleModifyOpen={handleModifyOpen} />
                          );
                        }
                        return acc;
                      }, [])
                    }
                  </Grid>
              }
            </Grid>
          </Grid>
        </Box>
      </Card>

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
      {
        openDuplicateModal ?
          <DuplicateProduct open={openDuplicateModal} setOpen={setOpenDuplicateModal} modifyProduct={modifyProduct} />
          :
          null
      }
    </>
  );
};

export default Products;