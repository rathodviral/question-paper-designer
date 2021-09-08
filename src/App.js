import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Login, Admin } from "./pages";
import { AdminContextProvider, AppContextProvider } from "./contexts";
import { AppSnackbar, AppAlertDialog } from "./components";
import MomentUtils from "@date-io/moment";

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <AppContextProvider>
        <AdminContextProvider>
          <div className="app">
            <Container maxWidth="xs" className="app-container">
              <Router>
                <Switch>
                  <Route path="/admin">
                    <Admin />
                  </Route>
                  <Route path="/">
                    <Login />
                  </Route>
                </Switch>
              </Router>
              <AppSnackbar />
              <AppAlertDialog />
            </Container>
          </div>
        </AdminContextProvider>
      </AppContextProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
