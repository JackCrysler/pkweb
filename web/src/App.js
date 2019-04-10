import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Start from './pages/start'
import PKstart from './pages/pkstart'
import PkRoom from './pages/pkroom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/start" component={Start}></Route>
            <Route path="/pkstart" component={PKstart}></Route>
            <Route path="/pkroom" component={PkRoom}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
