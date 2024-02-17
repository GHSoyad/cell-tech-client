import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box sx={{
      position: "absolute",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backdropFilter: "blur(2px)",
      zIndex: 5,
    }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;