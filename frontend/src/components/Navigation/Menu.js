import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import './menu.css';

const toggleMenuClasses = () => {
  let hamburgerIcon = document.getElementById('burger');
  hamburgerIcon.classList.toggle('is-active');
  let mobileMenu = document.getElementById('Aside');
  mobileMenu.classList.toggle('opened');
}
const Menu = props => (
  <AuthContext.Consumer>
    {(context) => {
      let menuList;
      if (context.roll === "Oficialia") {
        menuList = <React.Fragment>
              <ul className="menuNav1StUl">
                <li className="menuNavParentLi">
                  <NavLink className="menu-item" to="/findperson">Buscar Persona</NavLink>
                </li>
              </ul>
            </React.Fragment>
      }
      else if (context.roll === "AgentePPP") {
        menuList = <React.Fragment>
              <ul className="menuNav1StUl">
                <li className="menuNavParentLi">
                  <span className="menuNavParentLiSpan">Expedientes</span>
                  <ul className="menuNav2NdUl">
                    <li className="menuNavSecondLi">
                      <NavLink className="menu-item" to="/createcaso">Crear Expediente</NavLink>
                      <NavLink className="menu-item" to="/updatecaso">modificar Expediente</NavLink>
                    </li>
                  </ul>
                </li>
                <li className="menuNavParentLi">
                  <span className="menuNavParentLiSpan">Informes</span>
                  <ul className="menuNav2NdUl">
                    <li className="menuNavSecondLi">
                      <NavLink className="menu-item" to="/createinforme">Crear Informe</NavLink>
                      <NavLink className="menu-item" to="/updateinforme">modificar Informe</NavLink>
                    </li>
                  </ul>
                </li>
                <li className="menuNavParentLi">
                  <NavLink className="menu-item" to="/findperson">Buscar Persona</NavLink>
                </li>
              </ul>
            </React.Fragment>
      }
      else if (context.roll === "Administrador") {
        menuList = <React.Fragment>
              <ul className="menuNav1StUl">
                <li className="menuNavParentLi">
                  <NavLink className="menu-item" to="/newuser">Crear Usuario</NavLink>
                </li>
                <li className="menuNavParentLi">
                  <span className="menuNavParentLiSpan">Expedientes</span>
                  <ul className="menuNav2NdUl">
                    <li className="menuNavSecondLi">
                      <NavLink className="menu-item" to="/createcaso">Crear Expediente</NavLink>
                      <NavLink className="menu-item" to="/updatecaso">modificar Expediente</NavLink>
                    </li>
                  </ul>
                </li>
                <li className="menuNavParentLi">
                  <span className="menuNavParentLiSpan">Informes</span>
                  <ul className="menuNav2NdUl">
                    <li className="menuNavSecondLi">
                      <NavLink className="menu-item" to="/createinforme">Crear Informe</NavLink>
                      <NavLink className="menu-item" to="/updateinforme">modificar Informe</NavLink>
                    </li>
                  </ul>
                </li>
                <li className="menuNavParentLi">
                  <NavLink className="menu-item" to="/findperson">Buscar Persona</NavLink>
                </li>
              </ul>
            </React.Fragment>
      }
      return (
        <div className="menuAside">
          <div className="burger" id="burger" onClick={toggleMenuClasses}>
            <div className="lines">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        <aside className="Aside" id="Aside">
          <div className="menuHeader">
            <div className="menuHeaderTags">
              <div className="menuHeaderTagsUsuarioConectado">
                <span>Usuario conectado:</span>
              </div>
              <div className="menuHeaderTagsContext">
                <span>{context.name}</span>
              </div>
            </div>
            <div className="menuHeaderTitle">
              <h2 className="menuHeaderTitleH2">Panel de control</h2>
            </div>
          </div>
          <div className="menuNav">
            {menuList}
          </div>
          <div className="menuSesion">
            <button className="menu-btn" type="submit" onClick={context.logout}>Cerrar Sesión</button>
          </div>
        </aside>
        </div>
      );
    }}
  </AuthContext.Consumer>
)

export default Menu;