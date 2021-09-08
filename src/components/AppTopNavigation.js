import React, { useState, useContext } from "react";
import {
  makeStyles,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { AppContext } from "../contexts";
import { AppConstant, AppStorage } from "../utilities";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textTransform: "capitalize",
  },
}));

export default function AppTopNavigation() {
  const classes = useStyles();
  const { isUserLoggedIn, isUserAdmin, getUserObject } = useContext(AppContext);
  const history = useHistory();
  const {
    username,
    detail: { firstName, lastName },
  } = getUserObject();
  const [anchorEl, setAnchorEl] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (page) => {
    setAnchorEl(null);
    history.replace({ pathname: page });
  };

  const handleLogoutClick = (event) => {
    const { login } = AppConstant;
    AppStorage.removeItemFromStorage(login.storage);
    history.replace({ pathname: "/" });
  };

  const adminMenuItem = [
    { name: "Dashboard", path: "/admin" },
    { name: "School", path: "/admin/school" },
    { name: "Add School", path: "/admin/school/add" },
  ];
  const userMenuItem = [
    { name: "User Dashboard", path: "/user/" },
    { name: "Expense Report", path: "/user/expense/report" },
    { name: "Income Report", path: "/user/income/report" },
  ];

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {isUserAdmin() &&
        adminMenuItem.map((item, i) => (
          <MenuItem key={i} onClick={(e) => handleMenuClose(item.path)}>
            {item.name}
          </MenuItem>
        ))}
      {!isUserAdmin() &&
        userMenuItem.map((item, i) => (
          <MenuItem key={i} onClick={(e) => handleMenuClose(item.path)}>
            {item.name}
          </MenuItem>
        ))}
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {firstName} {lastName}
          </Typography>
          {username && (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleMenuClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {isUserLoggedIn() && renderMenu}
    </div>
  );
}
