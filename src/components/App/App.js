import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isMainPage, setIsMainPage] = React.useState(true);
  const [isSavedMovies, setIsSavedMovies] = React.useState(false);

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
              isSavedMovies = {isSavedMovies}
            />
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies
              isLoggedIn = {loggedIn}
              isMainPage = {isMainPage}
            />
          </Route>
          <Route exact path="/profile">
            <Profile
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
