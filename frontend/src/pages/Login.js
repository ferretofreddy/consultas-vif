import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

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

    
    console.log(this.state.server);

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
      <Card className='col-lg-4 mx-auto mt-5 card'>
        <Card.Header className="pb-4">
          <h2>Inicie sesion</h2>
        </Card.Header>
        <Card.Body className="mt-2">
          <Form className="show-grid" onSubmit={this.submitHandler}>
            <Form.Group>
              <Form.Label className="pl-4 mt-2 mb-1">Identificacion</Form.Label>
              <Form.Control as='input' type="text" id="identificacion" placeholder="Formato 101110111" ref={this.identificacionEl} />
            </Form.Group>

            <Form.Group>
              <Form.Label className="pl-4 mt-2 mb-1">Contraseña</Form.Label>
              <Form.Control as='input' type="password" id="password" placeholder="Ingrese su contraseña" ref={this.passwordEl} />
              <br />
              <Form.Text className="text-muted pl-4">
                Nunca comparta sus datos de acceso con alguien mas!!!.
              </Form.Text>
            </Form.Group>
            <Button className="col-md-4 offset-4 mt-4 btn-op" type="submit">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );

  }
}

export default LoginPage;