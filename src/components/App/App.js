import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <div className="page">
      <div className="page__container">
        <Switch>
          <Route exact path="/">
            <Header isLoggedIn={isLoggedIn} isHeaderColored={true} />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
          />
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
