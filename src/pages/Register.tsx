import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import authBackground from "../assets/images/auth-bg.jpg"
import { ChangeEvent, FormEvent, useState } from "react";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterData(prevData => ({
      ...prevData,
      [name]: value ? value : "",
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await registerUser(registerData);

    if (data?.data?.success) {
      toast.success(data?.data?.message);
      navigate("/login");
    }
    else {
      toast.error(data?.error?.data?.message || "Something unexpected has happened!");
    }
  }

  return (
    <Container sx={{ height: { xs: "100vh", md: "80vh", p: 8 }, position: "relative" }}>
      <Grid container spacing={2} sx={{ display: "flex", p: 8, height: "100%" }} >
        <Grid item xs={6} sx={{ height: "100%" }}>
          <Box sx={{ height: "100%" }}>
            <img src={authBackground} className="auth-bg" alt="" />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <form onSubmit={handleSubmit} className="border" style={{ padding: "16px", height: "100%", borderRadius: "8px", position: "relative" }}>
            {
              isLoading && <Loader />
            }
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 4 }, textAlign: "center" }}>
              <TextField
                required
                name="name"
                label="Full Name"
                fullWidth
                value={registerData.name}
                onChange={handleChange}
              />
              <TextField
                required
                type="email"
                name="email"
                label="Email"
                fullWidth
                value={registerData.email}
                onChange={handleChange}
              />
              <TextField
                required
                name="password"
                type="password"
                label="Password"
                fullWidth
                value={registerData.password}
                onChange={handleChange}
                inputProps={{
                  pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$",
                  title: "Password must be 6 characters containing a Uppercase, a Lowercase and a digit"
                }}
              />
              <Button
                variant="contained"
                size="large"
                type="submit"
              >
                Register
              </Button>
              <Typography>
                Don't Have an account? <Link to="/login">Login</Link>
              </Typography>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;