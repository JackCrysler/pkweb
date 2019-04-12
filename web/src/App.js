import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Entry from './pages/entry'
import PKstart from './pages/pkstart'
import PkRoom from './pages/pkroom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Entry}></Route>
            <Route path="/pkstart" component={PKstart}></Route>
            <Route path="/pkroom" component={PkRoom}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
