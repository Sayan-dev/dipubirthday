import React from "react";
import { Box, Container, makeStyles, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";

import Header from "./Header/Header";
import Background from "./Default/Background";
import Sidebar from "./Sidebar/Sidebar";
import NavMenu from "../commons/Menu/NavMenu";
import dummyMenu from "../../assets/json/dummyMenu";
import Drawer from "../commons/Drawer/Drawer";
import { createCSSValue } from "../../helpers/styles";
import Text from "../commons/Text";
import { DragDropContext } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: createCSSValue("drawerwidth", "calc(100% - |drawerwidth|px)"),
    marginLeft: createCSSValue("drawerwidth"),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawer: {
    width: createCSSValue("drawerwidth"),
    flexShrink: 0,
  },
  drawerPaper: {
    padding: theme.spacing(2),
    width: createCSSValue("drawerwidth"),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: createCSSValue("drawerwidth"),
  },
  headerFlex: {
    display: "flex",
    alignItems: "center",
  },
  contentHeader: {
    justifyContent: "space-between",
    // marginBottom: theme.spacing(3),
    padding: theme.spacing(2.5, 1.5),
  },
  sidebarToRight: {
    order: 1,
  },
  right: {
    // backgroundColor: "#e2e2aa"
  },
  /* 
        Ref: https://material-ui.com/components/grid/#negative-margin 
        !Do not use spacing in <Grid> it uses negative margin.
    */
  gutter: {
    padding: theme.spacing(1.5),
  },
  secondarySideBarChild: {
    marginTop: 10,
  },
}));

const DragDropBase = ({
  SidebarChild,
  SecondarySideBarChild,
  secondarySideBarChildProps,
  sidebarChildProps,
  hideSidebar = false,
  headerTitle = "Header Title",
  swap,
  ContentActionComponent,
  drawerwidth = 280,
  children,
}) => {
  const classes = useStyle({ drawerwidth });

  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Background />

      <Box className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <NavMenu menuList={dummyMenu.masterData} />
        </Drawer>
      </Box>

      <Header
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        handleDrawerOpen={toggleDrawer}
        isDrawerOpen={open}
      />

      <section
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Container maxWidth="xl">
          <Box className={clsx(classes.headerFlex, classes.contentHeader)}>
            <Text ascent="systemWhite" variant="h5">
              {headerTitle}
            </Text>
            <Box className={classes.headerFlex}>{ContentActionComponent}</Box>
          </Box>
          <Grid container className={classes.gridContainer}>
            
              {children}


        

          </Grid>
        </Container>
      </section>
    </>
  );
};

DragDropBase.propTypes = {
  hideSidebar: PropTypes.bool,
  swap: PropTypes.bool,
  SidebarChild: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  SecondarySideBarChild: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
  ]),
  ContentActionComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
  ]),
  sidebarChildProps: PropTypes.object,
  secondarySideBarChildProps: PropTypes.object,
};

export default DragDropBase;
