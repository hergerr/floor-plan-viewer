import { styled, Theme, CSSObject } from "@mui/material/styles";
import { Drawer } from "@mui/material";


const openedMixin = (theme: Theme): CSSObject => ({
  width: 400,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
  
const closedMixin = (theme: Theme, anchor: string): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  [theme.breakpoints.up("sm")]: {
    width: anchor === "right" ? 56 : 0,
  },
});

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== "open"})(
  ({ theme, open, anchor }) => ({
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && anchor && {
      ...closedMixin(theme, anchor),
      "& .MuiDrawer-paper": closedMixin(theme, anchor),
    }),
  }),
);

export default StyledDrawer;