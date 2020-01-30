import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import StoreProvider from './StoreProvider';
import PackageList from './PackageList';
import FileOpener from './FileOpener';
import PackageDetails from './PackageDetails';

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
