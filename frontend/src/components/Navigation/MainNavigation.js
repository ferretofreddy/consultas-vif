import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext  from '../../context/auth-context';


const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <h3 className="navbar-brand">Consultas VIF</h3>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <NavLink className="nav-link" to="/findperson">Buscar Persona</NavLink>
                  <span className="sr-only">(current)</span>
              </li>
              <li className="nav-item">
                  <NavLink className="nav-link" to="/newuser">Crear Usuario</NavLink>
              </li>
              <li className="nav-item">
                  <NavLink className="nav-link" to="/createcaso">Crear Caso</NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <p>{context.login.identificacion}</p>
              <button className="btn btn-secondary my-2 my-sm-0" onClick={context.logout}>Cerrar sesión</button>
            </form>
          </div>
        </nav>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;

/* <Navbar className="navbar navbar-dark bg-dark">
  <Navbar.Brand>Consultas VIF</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">

    {context.token && (
      <React.Fragment>
        <Nav className="mr-auto">
          <Nav.Link>
            <a href="/newuser">Crear usuario</a>
          </Nav.Link>
          <Nav.Link>
            <a href="/findperson">Buscar persona</a>
          </Nav.Link>
          <Nav.Link>
            <a href="/createcaso">Crear caso</a>
          </Nav.Link>
        </Nav>
        <Button variant="outline-primary" onClick={context.logout}>Logout</Button>
      </React.Fragment>
    )}
  </Navbar.Collapse>
</Navbar> */