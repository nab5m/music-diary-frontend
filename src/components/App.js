import React from 'react';
import {Route} from "react-router-dom";

import Splash from "../pages/Splash";
import Home from "../pages/Home";
import PlayListManager from "../pages/PlayListManager";
import Calendar from "../pages/Calendar";
import Friends from "../pages/Friends";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

function App() {
  return (
      <div className="App">
          <Route exact path="/" component={Splash} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/play-list-manager" component={PlayListManager} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/logout" component={Logout} />
      </div>
  );
}

export default App;
