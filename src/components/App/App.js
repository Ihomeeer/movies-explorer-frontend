import React from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  // хук для залогинивания
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isMainPage, setIsMainPage] = React.useState(false);

  return (
    <div className="App">
      <div className="page">
        <Switch>
          <Route exact path="/signup">
            <Register />
          </Route>
          <Route exact path="/signin">
            <Login />
          </Route>
          <Route exact path="/">
            <Main
              isLoggedIn = {loggedIn}
              isMainPage = {isMainPage}
            />
          </Route>
          <Route exact path="/movies">
            <Movies
              isLoggedIn = {loggedIn}
              isMainPage = {isMainPage}
            />
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies
              isLoggedIn = {loggedIn}
              isMainPage = {isMainPage}
            />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </div>
  );

}

export default App;
