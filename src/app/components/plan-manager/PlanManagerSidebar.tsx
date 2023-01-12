import React, { useEffect, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Box, Button, List, ListItemButton, ListItemText, Divider, Typography } from "@mui/material";

import ViewerSingleton from "../../common/ViewerSingleton";
import { useAppSelector } from "../../state/hooks";


const PlanManagerSidebar:React.FC = () => {
  const modelId = useAppSelector(state => state.modelId.value);
  const viewer:IfcViewerAPI = ViewerSingleton.getInstance();
  const [plans, setPlans] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [turnOffButtonDisabled, setTurnOffButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    async function computePlans(modelId: number) {
      await viewer.plans.computeAllPlanViews(modelId);
      const plans = viewer.plans.getAll(modelId);
      setPlans(plans);
    }

    if(modelId !== null){
      computePlans(modelId);
    }

  }, [modelId]);

  const handleItemClick = (index:number, id:string) => {
    if (modelId === null) return;
    
    setSelectedIndex(index);
    viewer.plans.goTo(modelId, id, true);
    setTurnOffButtonDisabled(false);
  };

  const turnOffPlanView = () => {
    setTurnOffButtonDisabled(true);
    setSelectedIndex(undefined);
    viewer.plans.exitPlanView();
  };

  return <>
    {modelId !== null 
      ? <Box sx={{display: "flex", flexDirection: "column"}}>
        {plans.length !== 0 &&
        <Button 
          variant="contained"
          size="small"
          sx={{ alignSelf: "center", my: 2 }}
          disabled={turnOffButtonDisabled} 
          onClick={turnOffPlanView}>
          Exit plan view
        </Button>
        }
        <List>
          {plans.map((el,index) => (
            <Box key={index}>
              <Divider />
              <ListItemButton
                key={index}
                selected={selectedIndex == index}
                onClick={(() => handleItemClick(index, el))}
              >
                <ListItemText primary={`Plan ${el}`} />
              </ListItemButton>
            </Box>
          )
          )}
          {plans.length !== 0
            ? <Divider />
            : <Typography sx={{mt: 2}} variant="body1" align="center">
              No plans defined.
            </Typography>
          }
        </List>
      </Box>
      : <Typography variant="h3">Load model</Typography>
    }
  </>;
};

export default PlanManagerSidebar;