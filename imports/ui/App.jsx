import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Main from "./Main.jsx";
import ManageRecords from "./ManageRecords";
import ManageTemplates from "./ManageTemplates";
import { createBrowserHistory as createHistory } from "history";

const App = () => {
  const browserHistory = createHistory();
  return (
    <div className="px-4 py-5">
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route
            exact
            path="/manage-record-templates"
            component={ManageTemplates}
          />
          <Route exact path="/manage-records/:id" component={ManageRecords} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
