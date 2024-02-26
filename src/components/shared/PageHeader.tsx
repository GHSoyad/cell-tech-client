import { Box, Divider, Typography } from '@mui/material';
import { ReactNode } from 'react';

const PageHeader = ({ title, children }: { title: string, children?: ReactNode }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        {children}
      </Box>
      <Divider sx={{ mb: { xs: 3 }, mt: 1 }} />
    </>
  );
};

export default PageHeader;