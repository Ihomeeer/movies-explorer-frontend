import React from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Main from '../Main/Main';

function App() {

  return (
    <div className="App">
      <Main />
    </div>
  );

}

export default App;
