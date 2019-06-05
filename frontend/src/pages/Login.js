import React, { Component } from 'react';

import './Login.css';
import AuthContext from '../context/auth-context';
import server from '../components/Variable/Variable';
import Background from '../img/bgUniforme.jpg';

var d1Style = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'left',
  backgroundRepeat: 'no-repeat'
};

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
      <div>
        <div className="d1" style={ d1Style }>

        </div>
        <div className="login">
          <form className="" onSubmit={this.submitHandler}>
            <h2>Login</h2>
            <label htmlFor="identificacion">Identificación:</label>
            <input className="txtb" type="text" name="identificacion" placeholder="101110111" ref={this.identificacionEl} />
            <label htmlFor="password">Contraseña:</label>
            <input className="txtb" type="password" name="password" ref={this.passwordEl} />
            <button className="btn2" type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;