import React, { createContext, useEffect, useState } from "react";
import { AppConstant, AppStorage, isFalsyValue } from "../utilities";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // const [navigationHader, setNavigationHader] = useState("color_1");
  const body = document.querySelector("body");
  // const [windowWidth, setWindowWidth] = useState(0);
  // const [windowHeight, setWindowHeight] = useState(0);

  let resizeWindow = () => {
    // setWindowWidth(window.innerWidth);
    // setWindowHeight(window.innerHeight);
    // window.innerWidth >= 768 && window.innerWidth < 1351
    //   ? body.setAttribute("data-sidebar-style", "mini")
    //   : window.innerWidth <= 768
    //   ? body.setAttribute("data-sidebar-style", "overlay")
    //   : body.setAttribute("data-sidebar-style", "full");
  };

  const getUserObject = () => {
    const { login } = AppConstant;
    return (
      AppStorage.getItemFromStorage(login.storage) || {
        username: null,
        role: null,
      }
    );
  };

  const isUserLoggedIn = () => {
    const { token } = getUserObject();
    return !isFalsyValue(token);
  };

  const isUserAdmin = () => {
    const {
      login: {
        roles: { admin },
      },
    } = AppConstant;
    const { role } = getUserObject();
    return role === admin;
  };

  const defaultSnackbarObj = { isOpen: false, message: "" };
  const [snackbarObj, setSnackbarObj] = useState(defaultSnackbarObj);

  const showSnackbar = (message) => {
    setSnackbarObj({ isOpen: true, message });
  };

  const hideSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarObj(defaultSnackbarObj);
  };

  const defaultAlertDialogObj = {
    isOpen: false,
    title: "",
    message: "",
    agreeBtnText: "Agree",
    disagreeBtnText: "Disagree",
  };

  const [alertDialogObj, setAlertDialogObj] = useState(defaultAlertDialogObj);

  const showAlertDialog = (obj) => {
    setAlertDialogObj({ ...obj, isOpen: true });
  };

  const hideAlertDialog = (event, reason) => {
    setAlertDialogObj(defaultAlertDialogObj);
  };

  useEffect(() => {
    //   body.setAttribute("data-typography", "poppins");
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <AppContext.Provider
      value={{
        body,
        getUserObject,
        isUserLoggedIn,
        isUserAdmin,
        snackbarObj,
        showSnackbar,
        hideSnackbar,
        alertDialogObj,
        showAlertDialog,
        hideAlertDialog,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
