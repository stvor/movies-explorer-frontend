import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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
  const [savedMoviesByCurrentUser, setSavedMoviesByCurrentUser] =  React.useState([]);

  const history = useHistory();

  const [isRegisterDataSending, setIsRegisterDataSending] = React.useState(false);
  const [registerRequestStatus, setRegisterRequestStatus] = React.useState({});
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
        if (err.statusCode === 409) {
          setRegisterRequestStatus({
            type: 'error',
            text: 'Пользователь с таким email уже существует'
          });
        } else {
          setRegisterRequestStatus({
            type: 'error',
            text: 'При регистрации пользователя произошла ошибка'
          });
        }
      })
      .finally(() => {
        setIsRegisterDataSending(false);
      })
  }

  const [isLoginDataSending, setIsLoginDataSending] = React.useState(false);
  const [loginRequestStatus, setLoginRequestStatus] = React.useState({});
  function handleLogin(loginData) {
    setIsLoginDataSending(true);
    mainApi.signIn(loginData)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        history.push('/movies');
      })
      .catch(err => {
        if (err.statusCode === 401) {
          setLoginRequestStatus({
            type: 'error',
            text: 'Вы ввели неправильный логин или пароль'
          });
        } else if (err.statusCode === 400) {
          setLoginRequestStatus({
            type: 'error',
            text: 'При авторизации произошла ошибка. Переданный токен некорректен'
          });
        } else {
          setLoginRequestStatus({
            type: 'error',
            text: 'При авторизации произошла ошибка'
          });
        }
      })
      .finally(() => {
        setIsLoginDataSending(false);
      })
  }

  const [isProfileDataSending, setIsProfileDataSending] = React.useState(false);
  const [profileRequestStatus, setProfileRequestStatus] = React.useState({});
  function handleProfileEdit(userData) {
    setProfileRequestStatus({});
    setIsProfileDataSending(true);
    const jwt = localStorage.getItem('jwt');
    mainApi.updateUser({ userData, jwt })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setProfileRequestStatus({
          type: 'success',
          text: 'Профиль обновлён.'
        });
      })
      .catch(err => {
        if (err.statusCode === 409) {
          setProfileRequestStatus({
            type: 'error',
            text: 'Пользователь с таким email уже существует'
          });
        } else {
          setProfileRequestStatus({
            type: 'error',
            text: 'При обновлении профиля произошла ошибка'
          });
        }
      })
      .finally(() => {
        setIsProfileDataSending(false);
      })
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('initialMovies');
    history.push('/');
  }

  function handleMovieSave(movie) {
    const jwt = localStorage.getItem('jwt');
    mainApi.saveMovie({ movie, jwt })
      .then((newSavedMovie) => {
        setSavedMoviesByCurrentUser((movies) => [
          newSavedMovie,
          ...movies
        ]);
      })
      .catch(console.log);
  }

  function handleMovieDelete(movie) {
    const jwt = localStorage.getItem('jwt');
    mainApi.deleteMovie({ movie, jwt })
      .then(() => {
        setSavedMoviesByCurrentUser((movies) => movies.filter((m) => m._id !== movie._id));
      })
      .catch(console.log);
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
        .catch(console.log);
    }
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getSavedMovies(jwt)
        .then((data) => {
          setSavedMoviesByCurrentUser(data.filter((i) => i.owner === currentUser._id));
        })
        .catch(console.log);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (isLoggedIn) {
      const jwt = localStorage.getItem('jwt');
      mainApi.getUser(jwt)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(console.log);
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
              savedMoviesByCurrentUser={savedMoviesByCurrentUser}
              onMovieSave={handleMovieSave}
              onMovieDelete={handleMovieDelete}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              isLoggedIn={isLoggedIn}
              savedMoviesByCurrentUser={savedMoviesByCurrentUser}
              onMovieDelete={handleMovieDelete}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              isLoggedIn={isLoggedIn}
              onProfileEdit={handleProfileEdit}
              onSignOut={handleSignOut}
              isSending={isProfileDataSending}
              requestStatus={profileRequestStatus}
            />
            <Route path="/signin">
              {isLoggedIn ? <Redirect to="/" /> :
                <Login
                  onLogin={handleLogin}
                  isSending={isLoginDataSending}
                  requestStatus={loginRequestStatus}
                />
              }
            </Route>
            <Route path="/signup">
              {isLoggedIn ? <Redirect to="/" /> :
                <Register
                  onRegister={handleRegister}
                  isSending={isRegisterDataSending}
                  requestStatus={registerRequestStatus}
                />
              }
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
