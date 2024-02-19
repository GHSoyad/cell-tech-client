import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import ProductCard from "../components/ui/ProductCard"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import AddProduct from "../components/ui/AddProduct";
import UpdateProduct from "../components/ui/UpdateProduct";
import { IProduct } from "../types/productTypes";
import DeleteProduct from "../components/ui/DeleteProduct";
import SellProduct from "../components/ui/SellProduct";
import SidebarFilter from "../components/ui/SidebarFilter";
import moment from "moment";
import PageHeader from "../components/shared/PageHeader";


const Products = () => {
  const { data: products, isLoading } = useGetProductsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [modifyProduct, setModifyProduct] = useState<IProduct>();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | undefined>([]);
  const [filter, setFilter] = useState({
    price: 0,
    start_date: "",
    end_date: "",
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
  };

  useEffect(() => {
    let productsList = products?.content;

    if (filter.price) {
      productsList = productsList?.filter((product: IProduct) => product.price <= filter.price);
    }
    if (filter.start_date) {
      productsList = productsList?.filter((product: IProduct) => moment(product.release_date).isAfter(filter.start_date));
    }
    if (filter.end_date) {
      productsList = productsList?.filter((product: IProduct) => moment(product.release_date).isBefore(filter.end_date));
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
      <PageHeader title="Products">
        <Button variant="contained" size="medium" endIcon={<AddIcon />} onClick={handleAddOpen}>
          New Product
        </Button>
      </PageHeader>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columnSpacing={[2, 3]}>
          <Grid item xs={3} >
            <SidebarFilter filter={filter} setFilter={setFilter} />
          </Grid>
          <Grid item xs={9} sx={{ position: "relative" }}>
            <div className="border" style={{ borderRadius: "10px", padding: "8px", minHeight: "calc(100vh - 188px)" }}>
              {
                isLoading ?
                  <CircularProgress sx={{ position: "absolute", top: "20%", left: "50%" }} />
                  :
                  <Grid container rowSpacing={[1, 2]} sx={{ position: "relative" }}>
                    {
                      filteredProducts?.reduce((acc: JSX.Element[], product: IProduct) => {
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