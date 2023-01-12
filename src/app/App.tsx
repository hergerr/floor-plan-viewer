import React, { useEffect, createRef, useState, SetStateAction } from "react";

import { Color } from "three";
import {
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Typography,
} from "@mui/material";
import { IFCModel } from "web-ifc-three/IFC/components/IFCModel";

import Navbar from "./components/Navbar";
import ViewerSingleton from "./common/ViewerSingleton";
import { useAppDispatch } from "./state/hooks";
import { setModelId } from "./state/slices/modelIdSlice";
import IfcSnackbar from "./components/IfcSnackbar";
import LeftSidebar from "./components/plan-manager/LeftSidebar";

function App() {
  const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const ifcContainer = createRef<HTMLDivElement>();
  const [ifcLoadingErrorMessage, setIfcLoadingErrorMessage] = useState<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ifcContainer.current) {
      const container = ifcContainer.current;
      new ViewerSingleton({ container, backgroundColor: new Color(0xffffff) });
    }
  }, []);

  const removeModels = () => {
    const viewer = ViewerSingleton.getInstance();

    // @ts-ignore
    const models = viewer.IFC.context.items.ifcModels;
    models.forEach((elem:IFCModel) => {viewer.context.scene.removeModel(elem);});
  };

  const ifcOnLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const viewer = ViewerSingleton.getInstance();
    if (file) {
      // remove previous model(s)
      removeModels();

      // reset
      setIfcLoadingErrorMessage("");
      setLoading(true);

      // load file
      const model: IFCModel = await viewer.IFC.loadIfc(file, true, ifcOnLoadError);
      dispatch(setModelId(model.modelID));
      // update information
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const ifcOnLoadError = async (err: { toString: () => SetStateAction<string | undefined>; }) => {
    setIfcLoadingErrorMessage(err.toString());
  };

  return (
    <>
      <Navbar ifcOnLoad={ifcOnLoad} />
      <LeftSidebar />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box component='main' sx={{ flexGrow: 1 }}>
          <div
            className={"ifcContainer"}
            ref={ifcContainer}
          />
        </Box>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2, display: "flex", flexDirection: "column" }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
        <Typography variant="body1" sx={{ mt: 2 }}>Loading model, please wait...</Typography>
      </Backdrop>

      <IfcSnackbar
        ifcLoadingErrorMessage={ifcLoadingErrorMessage}
        isSnackbarOpen={isSnackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
}

export { App };
