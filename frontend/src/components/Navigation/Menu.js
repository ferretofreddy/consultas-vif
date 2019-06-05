import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './menu.css';

const toggleMenuClasses = () => {
  let hamburgerIcon = document.getElementById('burger');
  hamburgerIcon.classList.toggle('is-active');
  let mobileMenu = document.getElementById('menu-container');
  mobileMenu.classList.toggle('opened');
}
const Menu = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <div>
          <div className="burger" id="burger" onClick={toggleMenuClasses}>
            <div className="lines">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <aside className="menu-container" id="menu-container">
            {/* <div className="menu-logo"><img className="menu-logo-img" src={require('../../assets/logo.png')} alt="dog" /></div> */}
            <div className="menu-title">Panel de control</div>
            {context.token && (
              <div className="menu-links">
              <React.Fragment>
                <NavLink className="menu-item" to="/createcaso">Crear Caso</NavLink>
                <NavLink className="menu-item" to="/findperson">Buscar Persona</NavLink>
                <NavLink className="menu-item" to="/newuser">Crear Usuario</NavLink>
                <button className="menu-btn" type="submit" onClick={context.logout}>Cerrar Sesión</button>
              </React.Fragment>
              </div>
            )}
          </aside>
        </div>
      );
    }}
  </AuthContext.Consumer>
)

export default Menu;