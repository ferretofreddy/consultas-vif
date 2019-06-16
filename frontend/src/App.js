import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/Login';
import CreateUserPage from './pages/CreateUser';
import FindPersonPage from './pages/FindPerson';
import CreateCasoPage from './pages/CreateCaso';
import CreateInformePage from './pages/CreateInforme';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
    identificacion: null,
    roll: null
  };

  login = (token, userId, tokenExpiration, identificacion, roll) => {
    this.setState({ token: token, userId: userId, identificacion: identificacion, roll: roll });
  };

  logout = () => {
    this.setState({ token: null, userId: null, identificacion: null, roll: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <Switch>
              {this.state.token && <Redirect from="/" to="/findperson" exact />}
              {!this.state.token && (
                <Redirect from="/" to="/login" exact />
              )}
              {this.state.token && <Redirect from="/login" to="/findperson" exact />}
              {!this.state.token && (
                <Route path="/login" component={LoginPage} />
              )}
              {this.state.token && (
                <Route path="/newuser" component={CreateUserPage} />
              )}
              {this.state.token && (
                <Route path="/findperson" component={FindPersonPage} />
              )}
              {this.state.token && (
                <Route path="/createcaso" component={CreateCasoPage} />
              )}
              {this.state.token && (
                <Route path="/createinforme" component={CreateInformePage} />
              )}
              {!this.state.token && <Redirect to="/login" exact />}
            </Switch>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
