import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Slide, TextField, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { ChangeEvent, FormEvent, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { MomentInput } from "moment";
import { useSellProductMutation } from "../../redux/features/sale/saleApi";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";
import { IModifyProductProps } from "../../types/productTypes";
import { useAppSelector } from "../../redux/hooks";

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


const SellProduct = ({ open, setOpen, modifyProduct }: IModifyProductProps) => {
  const [productData, setProductData] = useState({
    productId: modifyProduct?._id,
    buyerName: "",
    quantitySold: 0,
    dateSold: "",
    sellPrice: modifyProduct?.price,
    totalAmount: 0
  })

  const [sellProduct, { isLoading }] = useSellProductMutation();
  const user = useAppSelector((state) => state.auth.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "quantitySold") {
      if (parseInt(value) < 1 || parseInt(value) > (modifyProduct?.stock || 0)) return;

      setProductData(prevData => ({
        ...prevData,
        [name]: value ? parseInt(value) : 0,
        totalAmount: value ? (parseInt(value) * (prevData?.sellPrice || 0)) : prevData.totalAmount,
      }))
    }
    else {
      setProductData(prevData => ({
        ...prevData,
        [name]: value ? value : "",
      }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productData.quantitySold) {
      toast.error("Please enter quantity to be sold.");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await sellProduct({
      ...productData,
      dateSold: productData.dateSold || moment().format("YYYY-MM-DD"),
      sellerId: user?.userId,
    });

    if (data?.data?.success) {
      toast.success(data?.data?.message);
      handleClose();
    }
    else {
      toast.error(data?.error?.data?.message || "Something unexpected has happened!");
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
        Sell Product
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
            label="Product Name"
            fullWidth
            size="small"
            value={modifyProduct?.name}
            disabled
            sx={{ color: "black" }}
          />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <TextField
              label="Product Brand"
              margin="normal"
              fullWidth
              size="small"
              value={modifyProduct?.brand}
              disabled
            />
            <TextField
              label="Product Model"
              margin="normal"
              fullWidth
              size="small"
              value={modifyProduct?.model}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <TextField
              label="Current Price"
              margin="normal"
              fullWidth
              size="small"
              value={modifyProduct?.price}
              disabled
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              label="Stock Quantity"
              margin="normal"
              fullWidth
              size="small"
              value={modifyProduct?.stock}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <TextField
              required
              margin="normal"
              name="buyerName"
              label="Buyer Name"
              fullWidth
              size="small"
              value={productData.buyerName}
              onChange={handleChange}
            />
            <TextField
              required
              margin="normal"
              name="quantitySold"
              label={`Quantity to be Sold (Max ${modifyProduct?.stock})`}
              fullWidth
              size="small"
              type="number"
              value={productData.quantitySold}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 0, md: 2 } }}>
            <DatePicker
              name="dateSold"
              label="Date of Sell"
              value={productData.dateSold ? moment(productData.dateSold) : moment()}
              onChange={(e: MomentInput) =>
                setProductData(prevData => (
                  {
                    ...prevData,
                    dateSold: moment(e).format("YYYY-MM-DD")
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
              label="Total Amount"
              margin="normal"
              fullWidth
              size="small"
              value={productData.totalAmount}
              disabled
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

export default SellProduct;