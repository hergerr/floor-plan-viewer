import { Box } from "@mui/material";
import React from "react";

import StyledDrawer from "../StyledDrawer";
import PlanManagerSidebar from "./PlanManagerSidebar";

const LeftSidebar: React.FC = () => {

  return <Box sx={{ display: "flex", position: "absolute", top: 0, left: 0 }}>
    <StyledDrawer
      variant="permanent"
      open={true}
      anchor="left"
      PaperProps={{ sx: { mt: 8 } }}
    >
      <PlanManagerSidebar />
    </StyledDrawer >
  </Box>;
};

export default LeftSidebar;