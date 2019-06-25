import React, { Component } from 'react';

import './Login.css';
import AuthContext from '../context/auth-context';
import server from '../components/Variable/Variable';

class LoginPage extends Component {
  state = {
    server: server.server
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.identificacionEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const identificacion = this.identificacionEl.current.value;
    const password = this.passwordEl.current.value;

    if (identificacion.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($identificacion: String!, $password: String!) {
          login(identificacion: $identificacion, password: $password) {
            userId
            token
            tokenExpiration
            identificacion
            name
            roll
          }
        }
      `,
      variables: {
        identificacion: identificacion,
        password: password
      }
    };

    // 'http://localhost:4000/graphql' `'${this.state.server}'`  'http://192.168.0.101:4000/graphql'
    fetch(`${this.state.server}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Error de servidor!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration,
            resData.data.login.identificacion,
            resData.data.login.name,
            resData.data.login.roll
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="loginCard">
        <form className="loginForm" onSubmit={this.submitHandler}>
          <div className="loginFormDiv">
            <h2 className="loginFormH2">Login</h2>
          </div>
          <div className="loginFormDiv">
            <label className="loginFormLabel" htmlFor="identificacion">Identificación:</label>
            <input className="loginFormInput" autoFocus type="text" name="identificacion" placeholder="Identificación" autoComplete="identificacion" ref={this.identificacionEl} />
          </div>
          <div className="loginFormDiv">
            <label className="loginFormLabel" htmlFor="password">Contraseña:</label>
            <input className="loginFormInput" type="password" name="password" placeholder="Contraseña" autoComplete="current-password" ref={this.passwordEl} />
          </div>
          <div className="loginFormDiv">
            <button className="loginFormBtn" type="submit"  >Ingresar</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;