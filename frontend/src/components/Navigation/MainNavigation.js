import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import {
  Navbar,
  Nav,
  Button
} from 'react-bootstrap';

const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <Navbar className="navbar navbar-dark bg-dark">
          <Navbar.Brand>Consultas VIF</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            {context.token && (
              <React.Fragment>
                <Nav className="mr-auto">
                  <Nav.Link>
                    <NavLink to="/newuser">Crear Usuario</NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink to="/findperson">Buscar Persona</NavLink>
                  </Nav.Link>
                </Nav>
                <Button variant="outline-primary" onClick={context.logout}>Logout</Button>
              </React.Fragment>
            )}
          </Navbar.Collapse>
        </Navbar>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;