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
          throw new Error('Failed!');
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
      <div className="">
        <div className="mx-auto">
          <h1>Login</h1>
        </div>
        <div>
          <form className="col-md-4" onSubmit={this.submitHandler}>

            <fieldset>
              <div className="form-group">
                <label className="text-right">Identificación:</label>
                <div className=" ">
                  <input type="text" className="form-control-plaintext" id="identificacion" placeholder="Formato 101110111" ref={this.identificacionEl} />
                </div>
              </div>

              <div className="form-group">
                <label className="text-right">Contraseña:</label>
                <div className="">
                  <input type="password" className="form-control-plaintext" id="password" placeholder="Ingrese su contraseña" ref={this.passwordEl} />
                </div>
              </div>
              <button type="submit" className="btn btn-lg btn-block">Ingresar</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;