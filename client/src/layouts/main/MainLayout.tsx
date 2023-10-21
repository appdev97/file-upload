import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box component="main" sx={{ margin: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
