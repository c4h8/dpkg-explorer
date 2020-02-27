import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import StoreProvider from './StoreProvider';
import PackageList from './Components/PackageList';
import FileOpener from './Components/FileOpener';
import PackageDetails from './Components/PackageDetails';

import './Styles/App.css';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <FileOpener />
          <div className="content">
            <PackageList />
            <Route path="/packages/:packageName" render={(routeProps) => (
              <PackageDetails {...routeProps}/>
            )} />
          </div>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
