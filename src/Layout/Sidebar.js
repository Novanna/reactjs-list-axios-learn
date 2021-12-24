import * as React from 'react';
import LayoutStyles from './LayoutStyle'
import clsx from 'clsx';
import { mainList } from './sidebarList';
import Divider from "@mui/material/Divider";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';

const Sidebar = ({ open, toggleDrawer }) => {
  const classes = LayoutStyles();
  // console.log(open, toggleDrawer)
  return (
    <>
      <MuiDrawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {/* List isi sidebar ada di komponen sidebarList*/}
        {/* <List>{mainList}</List> */}
        {mainList}
      </MuiDrawer>
    </>
  )};
export default Sidebar;
