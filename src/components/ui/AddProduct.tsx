import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Slide, TextField, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { MomentInput } from "moment";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});


const AddProduct = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    model: "",
    price: "",
    quantity: "",
    release_date: "",
    operating_system: "",
    storage_capacity: "",
    ram_capacity: "",
    screen_size: "",
    camera_quality: "",
    battery_capacity: "",
    image: "",
  })

  const [createPost, { isLoading }] = useCreateProductMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProductData(prevData => ({
      ...prevData,
      [name]: value ? value : "",
    }))

    if (name === "price" || name == "quantity" || name === "storage_capacity" || name === 'ram_capacity' || name === 'camera_quality' || name === "battery_capacity") {
      setProductData(prevData => ({
        ...prevData,
        [name]: value ? parseInt(value) : "",
      }))
    } else if (name === "price" || name === "screen_size") {
      setProductData(prevData => ({
        ...prevData,
        [name]: value ? parseFloat(value) : "",
      }))
    }
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await createPost(productData);
    console.log(data.data)
    if (data?.data?.success) {
      toast.success(data?.data?.message);
      handleClose();
    }
  }

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      TransitionComponent={Transition}
      fullWidth
      scroll="body"
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add New Product
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ position: "relative" }}>
        {
          isLoading && <Loader />
        }
        <>
          <TextField
            required
            name="name"
            label="Product Name"
            fullWidth
            size="small"
            value={productData.name}
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <TextField
              required
              margin="normal"
              name="brand"
              label="Brand Name"
              fullWidth
              size="small"
              value={productData.brand}
              onChange={handleChange}
            />
            <TextField
              required
              margin="normal"
              name="model"
              label="Model Name"
              fullWidth
              size="small"
              value={productData.model}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <TextField
              required
              margin="normal"
              name="price"
              label="Price"
              fullWidth
              size="small"
              type="number"
              value={productData.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              required
              margin="normal"
              name="quantity"
              label="Quantity"
              fullWidth
              size="small"
              type="number"
              value={productData.quantity}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <TextField
              required
              margin="normal"
              name="storage_capacity"
              label="Storage Capacity"
              fullWidth
              size="small"
              type="number"
              value={productData.storage_capacity}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">GB</InputAdornment>,
              }}
            />
            <TextField
              required
              margin="normal"
              name="ram_capacity"
              label="Ram Capacity"
              fullWidth
              size="small"
              type="number"
              value={productData.ram_capacity}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">GB</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <TextField
              required
              margin="normal"
              name="operating_system"
              label="Operating System"
              fullWidth
              size="small"
              value={productData.operating_system}
              onChange={handleChange}
            />
            <TextField
              required
              margin="normal"
              name="screen_size"
              label="Screen Size"
              fullWidth
              size="small"
              type="number"
              value={productData.screen_size}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">Inches</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <TextField
              required
              margin="normal"
              name="camera_quality"
              label="Camera Quality"
              fullWidth
              size="small"
              type="number"
              value={productData.camera_quality}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">MP</InputAdornment>,
              }}
            />
            <TextField
              required
              margin="normal"
              name="battery_capacity"
              label="Battery Capacity"
              fullWidth
              size="small"
              type="number"
              value={productData.battery_capacity}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">mAh</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <DatePicker
              name="release_date"
              label="Release Date"
              onChange={(e: MomentInput) =>
                setProductData(prevData => (
                  {
                    ...prevData,
                    release_date: moment(e).format("YYYY-MM-DD")
                  }
                ))}
              closeOnSelect
              slotProps={{
                textField: {
                  required: true,
                  margin: "normal",
                  fullWidth: true,
                  size: "small",
                }
              }}
            />
            <TextField
              required
              margin="normal"
              name="image"
              label="Image Link"
              fullWidth
              size="small"
              value={productData.image}
              onChange={handleChange}
            />
          </Box>
        </>
      </DialogContent>
      <DialogActions>
        <Button type="submit" disabled={isLoading}>Submit</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default AddProduct;