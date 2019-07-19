import React, { Component } from 'react';

import './CreateUser.css';
import AuthContext from '../context/auth-context';
import Menu from '../components/Navigation/Menu';
import server from '../components/Variable/Variable';


class CreateUserPage extends Component {
  state = {
    server: server.server
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.identificacionEl = React.createRef();
    this.nameEl = React.createRef();
    this.rollEl = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    const identificacion = this.identificacionEl.current.value;
    const name = this.nameEl.current.value;
    const roll = this.rollEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0 || roll.trim().length === 0 || identificacion.trim().length === 0 || name.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
          mutation CrearUsuario($email: String!, $password: String!, $identificacion: String!, $name: String!, $roll: String! ) {
            crearUsuario(userInput: {email: $email, password: $password, identificacion: $identificacion, name: $name, roll: $roll }) {
              _id
              email
              identificacion
            }
          }
        `,
      variables: {
        email: email,
        password: password,
        identificacion: identificacion,
        name: name,
        roll: roll
      }

    }

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
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Menu />

        <div className='container'>
          <div className='FormHeader'>
            <h2 className='FormHeaderH2'>Crear nuevo Usuario</h2>
          </div>
          <div className='FormBody'>
            <form className='FormSubmit' onSubmit={this.submitHandler} >
              <div className='FormBodyRow'>
                <div className='FormBodyGroup'>
                  <span>Correo electrónico</span>
                  <input type="email" ref={this.emailEl} />
                </div>
                <div className='FormBodyGroup'>
                  <span>Contraseña</span>
                  <input type="password" ref={this.passwordEl} />
                </div>
              </div>
              <div className='FormBodyRow'>
                <div className='FormBodyGroup'>
                  <span>Identificacion</span>
                  <input type="text" ref={this.identificacionEl} />
                </div>
                <div className='FormBodyGroup'>
                  <span>Nombre</span>
                  <input type="text" ref={this.nameEl} />
                </div>
                <div className='FormBodyGroup'>
                  <span>Roll</span>
                  <select ref={this.rollEl}>
                    <option>Seleccione</option>
                    <option>Administrador</option>
                    <option>AgentePPP</option>
                    <option>Oficialia</option>
                  </select>
                </div>
              </div>
              <button className='CreateFormBtn' type="submit">
                Crear usuario
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateUserPage;