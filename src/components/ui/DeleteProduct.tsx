import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, Typography, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { FormEvent } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useDeleteProductMutation } from "../../redux/features/product/productApi";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";
import { IModifyProductProps } from "../../types/productTypes";

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


const DeleteProduct = ({ open, setOpen, modifyProduct }: IModifyProductProps) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await deleteProduct(modifyProduct?._id);

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
        Delete Product
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
        <Box>
          <Typography variant="h5">
            Delete {modifyProduct?.name}?
          </Typography>
          <Typography variant="h6" sx={{ my: 2 }}>
            Are you sure? {modifyProduct?.name} will be deleted permanently!
          </Typography>
          <Typography variant="inherit">
            This action cannot be undone!!
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" disabled={isLoading}>Submit</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default DeleteProduct;