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
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] =  React.useState([]);

  const history = useHistory();

  const [isRegisterDataSending, setIsRegisterDataSending] = React.useState(false);
  function handleRegister(registerData) {
    setIsRegisterDataSending(true);
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
      .finally(() => {
        setIsRegisterDataSending(false);
      })
  }

  const [isLoginDataSending, setIsLoginDataSending] = React.useState(false);
  function handleLogin(loginData) {
    setIsLoginDataSending(true);
    mainApi.signIn(loginData)
      .then(res => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        history.push('/movies');
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoginDataSending(false);
      })
  }

  const [isProfileDataSending, setIsProfileDataSending] = React.useState(false);
  function handleProfileEdit(userData) {
    setIsProfileDataSending(true);
    const jwt = localStorage.getItem('jwt');
    mainApi.updateUser({ userData, jwt })
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsProfileDataSending(false);
      })
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/');
  }

  function handleMovieSave(movie) {
    const jwt = localStorage.getItem('jwt');
    mainApi.saveMovie({ movie, jwt })
      .then((data) => {
        setSavedMovies((state) => [
          data,
          ...state
        ]);
      })
      .catch(err => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUser(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getSavedMovies(jwt)
        .then((data) => {
          setSavedMovies(data);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      const jwt = localStorage.getItem('jwt');
      mainApi.getUser(jwt)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(err => {
          console.log(err)
        });
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
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
              onProfileEdit={handleProfileEdit}
              onSignOut={handleSignOut}
              isSending={isProfileDataSending}
            />
            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                isSending={isLoginDataSending}
              />
            </Route>
            <Route path="/signup">
              <Register
                onRegister={handleRegister}
                isSending={isRegisterDataSending}
              />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
