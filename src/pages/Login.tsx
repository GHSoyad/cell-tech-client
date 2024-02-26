import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import authBackground from "../assets/images/auth-bg.jpg"
import { ChangeEvent, FormEvent, useState } from "react";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData(prevData => ({
      ...prevData,
      [name]: value ? value : "",
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await loginUser(loginData);

    if (data?.data?.success) {
      const { token, ...userInfo } = data.data.content;
      toast.success(data?.data?.message);
      dispatch(setUser({ user: userInfo, token }));
      navigate("/dashboard");
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
                type="email"
                name="email"
                label="Email"
                fullWidth
                value={loginData.email}
                onChange={handleChange}
              />
              <TextField
                required
                name="password"
                type="password"
                label="Password"
                fullWidth
                value={loginData.password}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                size="large"
                type="submit"
              >
                Login
              </Button>
              <Typography>
                Don't Have an account? <Link to="/register">Register</Link>
              </Typography>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;