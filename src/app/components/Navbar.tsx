import * as React from "react";
import { Button, AppBar, Toolbar, Box, Typography, InputBase } from "@mui/material";
import { FileOpenOutlined } from "@mui/icons-material";


interface Props {
  ifcOnLoad: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const Navbar: React.FC<Props> = ({ ifcOnLoad }) => {
  return (
    <AppBar 
      position="fixed"
      elevation={0}
      sx={{zIndex: (theme) => theme.zIndex.drawer + 2}}
    >
      <Toolbar>
        <Box>
          <Button
            startIcon={<FileOpenOutlined />}
            size="small"
            color="inherit"
            component="label"
          >
            <Typography variant='button' sx={{ fontSize: { xs: "0.5rem", sm: "0.875rem" } }}>
              Load file
            </Typography>
            <Box sx={{display: "none"}}>
              <InputBase
                id="fileInput"
                inputProps={{ accept: ".ifc,.IFC" }}
                type="file"
                onChange={ifcOnLoad}
              />
            </Box>
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;