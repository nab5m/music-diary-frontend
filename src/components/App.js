import React from 'react';
import './css/App.css';
import {Route} from "react-router-dom";
import Splash from "../pages/Splash";
import Home from "../pages/Home";

function App() {
  return (
      <div className="App">
          <Route exact path="/" component={Splash} />
          <Route exact path="/home" component={Home} />
      </div>
  );
}

export default App;
