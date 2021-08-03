import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const [currentUser, setCurrentUser] = React.useState({});

  const history = useHistory();

  function handleRegister(registerData) {
    mainApi.signUp(registerData)
      .then(() => {
        handleLogin({
          email: registerData.email,
          password: registerData.password,
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleLogin(loginData) {
    mainApi.signIn(loginData)
      .then(res => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        setCurrentUser({ email: loginData.email });
        history.push('/movies');
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
