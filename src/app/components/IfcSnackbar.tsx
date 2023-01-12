import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface Props {
  isSnackbarOpen: boolean,
  ifcLoadingErrorMessage: string | undefined,
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const IfcSnackbar: React.FC<Props> = ({isSnackbarOpen, ifcLoadingErrorMessage, setSnackbarOpen}) => {
  return  <Snackbar
    sx={{ mb: { xs: 1, sm: 2 }, ml: { xs: 1, sm: 2 }, }}
    open={isSnackbarOpen}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    autoHideDuration={6000} 
    onClose={() => setSnackbarOpen(false)}>

    {ifcLoadingErrorMessage ?
      <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: "100%" }}>
      Error loading the IFC File. Check the console for more information.
      </Alert>
      : <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
      IFC File loaded successfully!
      </Alert>}
  </Snackbar>;
};

export default IfcSnackbar;