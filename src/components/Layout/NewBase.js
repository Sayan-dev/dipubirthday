import React from "react";
import { Box, Container, makeStyles, Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";

import Header from "./Header/Header";
import Background from "./Default/Background";
import Sidebar from "./Sidebar/Sidebar";
import NavMenu from "../commons/Menu/NavMenu";
import dummyMenu from "../../assets/json/dummyMenu";
import Drawer from "../commons/Drawer/Drawer";
import { createCSSValue, fadeAscentColor } from "../../helpers/styles";
import Text from "../commons/Text";
// import FormDataProvider from "../commons/Form/FormDataProvider";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    '& .MuiDrawer-paperAnchorDockedLeft': {
      backgroundColor: fadeAscentColor(theme, 0),
      boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.25)"

    }
  },

  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
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
    whiteSpace: 'nowrap',

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
  drawerOpen: {
    width: createCSSValue("drawerwidth"),
    padding:theme.spacing(2),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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
  hide:{
      display:"none"
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

const NewBase = ({
  SidebarChild,
  form,
  SecondarySideBarChild,
  secondarySideBarChildProps,
  sidebarChildProps,
  hideSidebar = false,
  headerTitle = "Header Title",
  swap,
  isMultiPartForm = false,
  childWidth = 9,
  ContentActionComponent,
  formConstantObject = {},
  drawerwidth = 280,
  children,
  ascent = "systemWhite",
  isForm = false,
  formHookSubmit = (e) => { },
  onSubmit,
}) => {
  const methods = useForm();
  const classes = useStyle({ drawerwidth, ascent });

  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Background />

      <Box className={classes.root}>
        <Drawer
          className={clsx(classes.drawer,
            {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }
            )}

          variant="permanent"
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <NavMenu hide={open} menuList={dummyMenu.masterData} />
        </Drawer>
      </Box>

      <Header
        position="fixed"
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
          {isForm ? (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box
                  className={clsx(classes.headerFlex, classes.contentHeader)}
                >
                  <Text ascent="systemWhite" variant="h5">
                    {headerTitle}
                  </Text>
                  <Box className={classes.headerFlex}>
                    {ContentActionComponent}
                  </Box>
                </Box>
                <Grid container className={classes.gridContainer}>
                  {hideSidebar ? null : (
                    <Grid
                      item
                      md={12 - childWidth > 0 ? 12 - childWidth : 12}
                      sm={12}
                      xs={12}
                      className={clsx(classes.sidebar, classes.gutter, {
                        [classes.sidebarToRight]: swap,
                      })}
                    >
                      {SidebarChild ? (
                        <Sidebar>
                          {<SidebarChild {...sidebarChildProps} />}
                        </Sidebar>
                      ) : null}
                      {SecondarySideBarChild ? (
                        <Sidebar className={classes.secondarySideBarChild}>
                          {
                            <SecondarySideBarChild
                              {...secondarySideBarChildProps}
                            />
                          }
                        </Sidebar>
                      ) : null}
                    </Grid>
                  )}

                  <Grid
                    item
                    md={hideSidebar ? 12 : childWidth}
                    sm={12}
                    xs={12}
                    className={clsx(classes.right, classes.gutter)}
                  >
                    {children}
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          ) : (
              <>
                <Box className={clsx(classes.headerFlex, classes.contentHeader)}>
                  <Text ascent="systemWhite" variant="h5">
                    {headerTitle}
                  </Text>
                  <Box className={classes.headerFlex}>
                    {ContentActionComponent}
                  </Box>
                </Box>
                <Grid container className={classes.gridContainer}>
                  {hideSidebar ? null : (
                    <Grid
                      item
                      md={12 - childWidth > 0 ? 12 - childWidth : 12}
                      sm={12}
                      xs={12}
                      className={clsx(classes.sidebar, classes.gutter, {
                        [classes.sidebarToRight]: swap,
                      })}
                    >
                      {SidebarChild ? (
                        <Sidebar>
                          {<SidebarChild {...sidebarChildProps} />}
                        </Sidebar>
                      ) : null}
                      {SecondarySideBarChild ? (
                        <Sidebar className={classes.secondarySideBarChild}>
                          {
                            <SecondarySideBarChild
                              {...secondarySideBarChildProps}
                            />
                          }
                        </Sidebar>
                      ) : null}
                    </Grid>
                  )}

                  <Grid
                    item
                    md={hideSidebar ? 12 : childWidth}
                    sm={12}
                    xs={12}
                    className={clsx(classes.right, classes.gutter)}
                  >
                    {children}
                  </Grid>
                </Grid>
              </>
            )}
        </Container>
      </section>
    </>
  );
};

NewBase.propTypes = {
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

export default NewBase;
