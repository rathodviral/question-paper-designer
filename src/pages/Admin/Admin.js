import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { AppTopNavigation } from "components";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Dashboard from "./Dashboard";
import { AdminContext, AppContext } from "contexts";
import { useEffect } from "react";
import { AppApiFetch, AppConstant } from "utilities";
import { useHistory } from "react-router-dom";
import { School, AddSchool } from "./School";
import { Standard, AddStandard } from "./Standard";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  dashboard: {
    marginTop: "4.8rem",
  },
});

export default function Admin() {
  const classes = useStyles();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { isUserLoggedIn, isUserAdmin } = useContext(AppContext);
  const { setAdminData } = useContext(AdminContext);
  const {
    admin: { apiPath },
  } = AppConstant;

  const getAdminDataEvent = async () => {
    const options = {
      method: "GET",
    };
    const response = await AppApiFetch(apiPath, options);
    const { status, data } = await response.json();
    if (status) {
      setAdminData(data);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn() && isUserAdmin()) {
      getAdminDataEvent();
    } else {
      history.replace({ pathname: "/" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <AppTopNavigation></AppTopNavigation>
      <div className={classes.dashboard}>
        <Switch>
          <Route exact path={`${path}/school/add`}>
            <AddSchool reloadData={getAdminDataEvent}></AddSchool>
          </Route>
          <Route exact path={`${path}/school`}>
            <School reloadData={getAdminDataEvent}></School>
          </Route>
          <Route exact path={`${path}/standard/add`}>
            <AddStandard reloadData={getAdminDataEvent}></AddStandard>
          </Route>
          <Route exact path={`${path}/standard`}>
            <Standard reloadData={getAdminDataEvent}></Standard>
          </Route>
          <Route exact path={`${path}`}>
            <Dashboard></Dashboard>
          </Route>
        </Switch>
      </div>
    </div>
  );
}
