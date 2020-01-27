import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import PackageList from './PackageList';
import FileOpener from './FileOpener';
import PackageDetails from './PackageDetails';

function App() {
  const [packageNames, setPackageNames] = useState([])
  const [packageMap, setPackageMap] = useState({})

  return (
    <div className="App">
      <Router>
        <FileOpener setPackageNames={setPackageNames} setPackageMap={setPackageMap} />
        <div className="content">
          <PackageList packageNames={packageNames} />
          <Route path="/packages/:packageName" render={(routeProps) => (
            <PackageDetails packageMap={packageMap} {...routeProps}/>
          )} />
        </div>
      </Router>
    </div>
  );
}

export default App;
