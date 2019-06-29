import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/Login';
import CreateUserPage from './pages/CreateUser';
import FindPersonPage from './pages/FindPerson';
import CreateCasoPage from './pages/CreateCaso';
import UpdateCasoPage from './pages/UpdateCaso';
import CreateInformePage from './pages/CreateInforme';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
    identificacion: null,
    name: null,
    roll: null 
  };
  
  login = (token, userId, tokenExpiration, identificacion, name, roll) => {
    this.setState({ token: token, userId: userId, tokenExpiration: tokenExpiration, identificacion: identificacion, name: name, roll: roll });
  };

  logout = () => {
    this.setState({ token: null, userId: null, tokenExpiration: null, identificacion: null, name: null, roll: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              roll: this.state.roll,
              userId: this.state.userId,
              name: this.state.name,
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
                <Route path="/updatecaso" component={UpdateCasoPage} />
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
