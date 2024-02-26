import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Slide, TextField, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { FormEvent, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";
import { IModifyUserProps } from "../../types/userTypes";
import { useUpdateUserMutation } from "../../redux/features/user/userApi";

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


const UpdateUser = ({ open, setOpen, modifyUser }: IModifyUserProps) => {
  const [userData, setUserData] = useState({
    _id: modifyUser?._id,
    name: modifyUser?.name,
    email: modifyUser?.email,
    role: modifyUser?.role,
  })

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await updateUser({ ...userData });

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
        Update User
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
            label="User Name"
            fullWidth
            size="small"
            value={userData.name}
            // onChange={handleChange}
            disabled
          />
          <TextField
            required
            margin="normal"
            name="email"
            label="User Email"
            fullWidth
            size="small"
            value={userData.email}
            // onChange={handleChange}
            disabled
          />
          <FormControl
            fullWidth
            margin="normal"
            size="small"
          >
            <InputLabel id="userRole">User Role</InputLabel>
            <Select
              labelId="userRole"
              value={userData?.role?.toLowerCase() || ""}
              label="User Role"
              onChange={(e) =>
                setUserData(prevData => ({
                  ...prevData,
                  role: e?.target?.value?.toLowerCase(),
                }))}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"user"}>User</MenuItem>
            </Select>
          </FormControl>
        </>
      </DialogContent>
      <DialogActions>
        <Button type="submit" disabled={isLoading}>Submit</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default UpdateUser;