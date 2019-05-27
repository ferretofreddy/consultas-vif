import React, { Component } from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';

import './CreateUser.css';
import AuthContext from '../context/auth-context';
import MainNavigation from '../components/Navigation/MainNavigation';

class CreateUserPage extends Component {

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

    fetch('http://localhost:4000/graphql', {
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
        <MainNavigation />
      
      <Card className='col-lg-6 mx-auto mt-5 card text-white bg-dark' border="primary">
        <Card.Header><h2>Crear nuevo Usuario</h2></Card.Header>
        <Card.Body>
          <Form onSubmit={this.submitHandler} >
            <Form.Row>
              <Form.Group as={Col} >
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control as='input' id="email" type="email" ref={this.emailEl} />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control as='input' id="password" type="password" ref={this.passwordEl} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} >
                <Form.Label>Identificacion</Form.Label>
                <Form.Control as='input' id="identificacion" type="text" ref={this.identificacionEl}/>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Nombre</Form.Label>
                <Form.Control as='input' id="name" type="text" ref={this.nameEl}/>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Roll</Form.Label>
                <Form.Control as="select" id="roll" ref={this.rollEl}>
                  <option>Seleccione</option>
                  <option>Administrador</option>
                  <option>AgentePPP</option>
                  <option>Oficialia</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Button variant="outline-primary" type="submit">
              Crear usuario
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </React.Fragment>
    );
  }
}

export default CreateUserPage;