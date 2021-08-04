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
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

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
        history.push('/movies');
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleProfileEdit(userData) {
    const jwt = localStorage.getItem('jwt');
    mainApi.updateUser({ userData, jwt })
      .then(() => console.log('Update profile success'))
      .catch(err => {
        console.log(err)
      })
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/');
  }

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
              onProfileEdit={handleProfileEdit}
              onSignOut={handleSignOut}
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
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
