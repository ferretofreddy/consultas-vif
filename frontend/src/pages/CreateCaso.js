import React, { Component } from 'react';

import Menu from '../components/Navigation/Menu';
import AuthContext from '../context/auth-context';
import server from '../components/Variable/Variable';

import './CreateCaso.css';

class CreateCasoPage extends Component {
  state = {
    server: server.server,
    NewCaso: true,
    FindImputado: false,
    CreateImputado: false,
    ImputadoNonData: false,
    FindOfendido: false,
    CreateOfendido: false,
    OfendidoNonData: false,
    Result: false,
    imputadoId: null,
    imputadoIdentificacion: null,
    ofendidoId: null,
    ofendidoIdentificacion: null,
    expedienteId: null,
    expediente: null,
    juzgado: null,
    imputadoNombre: null,
    ofendidoNombre: null
  };

  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.expedienteEl = React.createRef();
    this.juzgadoEl = React.createRef();
    this.notifImputadoEl = React.createRef();
    this.f_notifImputadoEl = React.createRef();
    this.notifOfendidoEl = React.createRef();
    this.f_notifOfendidoEl = React.createRef();
    this.desalojoEl = React.createRef();
    this.cambioDomicilioVictEl = React.createRef();
    this.medidasProteccionEl = React.createRef();
    this.f_emisionMedidasEl = React.createRef();
    this.imputadoIdentificacionEl = React.createRef();
    this.ofendidoIdentificacionEl = React.createRef();
    this.nombreEl = React.createRef();
    this.PersonaIdentificacionEl = React.createRef();
    this.f_nacimientoEl = React.createRef();
    this.sexoEl = React.createRef();
    this.edadEl = React.createRef();
    this.provinciaEl = React.createRef();
    this.cantonEl = React.createRef();
    this.distritoEl = React.createRef();
    this.direccionEl = React.createRef();

  }

  crearCasoHandler = event => {
    event.preventDefault();
    const expediente = this.expedienteEl.current.value;
    const juzgado = this.juzgadoEl.current.value;
    const notifImputado = this.notifImputadoEl.current.value;
    const f_notifImputado = this.f_notifImputadoEl.current.value;
    const notifOfendido = this.notifOfendidoEl.current.value;
    const f_notifOfendido = this.f_notifOfendidoEl.current.value;
    const desalojo = this.desalojoEl.current.value;
    const cambioDomicilioVict = this.cambioDomicilioVictEl.current.value;
    const medidasProteccion = this.medidasProteccionEl.current.value;
    const f_emisionMedidas = this.f_emisionMedidasEl.current.value;
    const imputado = this.state.imputadoId;
    const ofendido = this.state.ofendidoId;


    if (expediente.trim().length === 0 || juzgado.trim().length === 0/*  || imputado.trim().length === 0 || ofendido.trim().length === 0 */) {
      return;
    }

    this.setState({ NewCaso: false });

    const requestBody = {
      query: `
          mutation CrearCaso($expediente: String!, $juzgado: String!, $notifImputado: Boolean, $f_notifImputado: String, $notifOfendido: Boolean, $f_notifOfendido: String, $desalojo: Boolean, $cambioDomicilioVict: Boolean, $medidasProteccion: Boolean, $f_emisionMedidas: String, $imputado: String!, $ofendido: String!) {
            crearCaso(casoInput:{expediente: $expediente, juzgado: $juzgado, notifImputado: $notifImputado, f_notifImputado: $f_notifImputado, notifOfendido: $notifOfendido, f_notifOfendido: $f_notifOfendido, desalojo: $desalojo, cambioDomicilioVict: $cambioDomicilioVict, medidasProteccion: $medidasProteccion,f_emisionMedidas: $f_emisionMedidas, imputado: $imputado, ofendido: $ofendido})
            {
              _id
              expediente
              juzgado
              imputado{
                nombre
                identificacion
              }
              ofendido{
                nombre
                identificacion
              }
            }
          }
        `,

      variables: {
        expediente: expediente,
        juzgado: juzgado,
        notifImputado: notifImputado,
        f_notifImputado: f_notifImputado,
        notifOfendido: notifOfendido,
        f_notifOfendido: f_notifOfendido,
        desalojo: desalojo,
        cambioDomicilioVict: cambioDomicilioVict,
        medidasProteccion: medidasProteccion,
        f_emisionMedidas: f_emisionMedidas,
        imputado: imputado,
        ofendido: ofendido
      }
    }

    const token = this.context.token;

    fetch(`${this.state.server}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Error de servidor!');
        }
        return res.json();
      })
      .then(resData => {
        const expedienteId = resData.data.crearCaso._id;
        const expediente = resData.data.crearCaso.expediente;
        const juzgado = resData.data.crearCaso.juzgado;
        const imputadoNombre = resData.data.crearCaso.imputado.nombre;
        const ofendidoNombre = resData.data.crearCaso.ofendido.nombre;
        if (resData === null) {
          this.setState({ result: false });
        }
        if (this.isActive) {
          this.setState({
            expedienteId: expedienteId,
            expediente: expediente,
            juzgado: juzgado,
            imputadoNombre: imputadoNombre,
            ofendidoNombre: ofendidoNombre,
            Result: true
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ Result: false });
      });
  };

  buscarImputado = event => {
    event.preventDefault();
    this.setState({ FindImputado: true, NewCaso: false });
  };

  buscarOfendido = event => {
    event.preventDefault();
    this.setState({ FindOfendido: true, NewCaso: false });
  };

  buscarPersonaHandler = event => {
    event.preventDefault();
    const personaIdentificacion = this.PersonaIdentificacionEl.current.value;

    const requestBody = {
      query: `
          query BuscarPersona($identificacion: String! ) {
            buscarPersona(identificacion: $identificacion){
              _id
              identificacion
            }
          }
        `,

      variables: {
        identificacion: personaIdentificacion
      }
    }

    const token = this.context.token;

    fetch(`${this.state.server}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Error de servidor!');
        }
        return res.json();

      })
      .then(resData => {
        console.log(resData);
        if (this.state.FindImputado) {

          if (resData.data.buscarPersona === null) {
            this.setState({ imputadoId: null, imputadoIdentificacion: null, FindImputado: false, NewCaso: true, ImputadoNonData: true });
            return;
          }

          const personaId = resData.data.buscarPersona._id;
          const personaIdentificacion = resData.data.buscarPersona.identificacion;
          if (this.isActive) {
            this.setState({
              imputadoId: personaId,
              imputadoIdentificacion: personaIdentificacion,
              NewCaso: true,
              FindImputado: false
            });
            console.log(this.state.imputadoIdentificacion);
          }
        };
        if (this.state.FindOfendido) {

          if (resData.data.buscarPersona === null) {
            this.setState({ ofendidoId: null, ofendidoIdentificacion: null, FindOfendido: false, NewCaso: true, OfendidoNonData: true });
            return;
          }

          const personaId = resData.data.buscarPersona._id;
          const personaIdentificacion = resData.data.buscarPersona.identificacion;
          if (this.isActive) {
            this.setState({
              ofendidoId: personaId,
              ofendidoIdentificacion: personaIdentificacion,
              NewCaso: true,
              FindOfendido: false
            });
            console.log(this.state.ofendidoIdentificacion);
          }
        };
      })
      .catch(err => {
        console.log(err);
      });
  };

  crearImputado = event => {
    event.preventDefault();
    this.setState({ CreateImputado: true, ImputadoNonData: false, NewCaso: false });
  };

  crearOfendido = event => {
    event.preventDefault();
    this.setState({ CreateOfendido: true, OfendidoNonData: false, NewCaso: false });
  };

  crearPersonaHandler = event => {
    event.preventDefault();
    const nombre = this.nombreEl.current.value;
    const PersonaIdentificacion = this.PersonaIdentificacionEl.current.value;
    const f_nacimiento = new Date(this.f_nacimientoEl.current.value).toISOString();
    const sexo = this.sexoEl.current.value;
    const edad = +this.edadEl.current.value;
    const provincia = this.provinciaEl.current.value;
    const canton = this.cantonEl.current.value;
    const distrito = this.distritoEl.current.value;
    const direccion = this.direccionEl.current.value;

    if (nombre.trim().length === 0 || PersonaIdentificacion.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
          mutation CrearPersona($nombre: String!, $identificacion: String!, $f_nacimiento: String, $sexo: String, $edad: Int, $provincia: String, $canton: String, $distrito: String, $direccion: String) {
            crearPersona(personaInput:{nombre: $nombre, identificacion: $identificacion, f_nacimiento: $f_nacimiento, sexo: $sexo, edad: $edad, provincia: $provincia, canton: $canton, distrito: $distrito, direccion: $direccion,}){
              _id
              identificacion
              nombre
            }
          }
        `,

      variables: {
        nombre: nombre,
        identificacion: PersonaIdentificacion,
        f_nacimiento: f_nacimiento,
        sexo: sexo,
        edad: edad,
        provincia: provincia,
        canton: canton,
        distrito: distrito,
        direccion: direccion

      }
    }

    const token = this.context.token;

    fetch(`${this.state.server}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Error de servidor!');
        }
        return res.json();
      })
      .then(resData => {
        if (this.state.CreateImputado) {
          const personaId = resData.data.crearPersona._id;
          const personaIdentificacion = resData.data.crearPersona.identificacion;

          if (resData === null) {
            this.setState({ imputadoId: null, imputadoIdentificacion: null });
          }
          if (this.isActive) {
            this.setState({
              imputadoId: personaId, imputadoIdentificacion: personaIdentificacion, CreateImputado: false, NewCaso: true
            });
            console.log(this.state.imputadoIdentificacion);
          }
        };
        if (this.state.CreateOfendido) {
          const personaId = resData.data.crearPersona._id;
          const personaIdentificacion = resData.data.crearPersona.identificacion;

          if (resData === null) {
            this.setState({ ofendidoId: null, ofendidoIdentificacion: null });
          }
          if (this.isActive) {
            this.setState({
              ofendidoId: personaId, ofendidoIdentificacion: personaIdentificacion, CreateOfendido: false, NewCaso: true
            });
            console.log(this.state.ofendidoIdentificacion);
          }
        };
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  };

  render() {
    const datoImputado = this.state.imputadoId;
    const sinResultado = this.state.ImputadoNonData;
    let campoImputado;
    if (datoImputado !== null) {
      campoImputado = <div className="">
        <label className="">Identificacion del imputado:</label>
        <input className="" defaultValue={this.state.imputadoIdentificacion} />
      </div>
    }
    else if (sinResultado) {
      campoImputado = <div className="">
        <label className="">Sin resultados...</label>
        <button className="" onClick={this.crearImputado}>Crear Imputado</button>
      </div>
    }
    else {
      campoImputado = <button className="" onClick={this.buscarImputado}>Cargar Imputado</button>
    }

    const datoOfendido = this.state.ofendidoId;
    const sinResultado1 = this.state.OfendidoNonData;
    let campoOfendido;
    if (datoOfendido !== null) {
      campoOfendido = <div className="">
        <label className="">Identificacion del ofendido:</label>
        <input className="" defaultValue={this.state.ofendidoIdentificacion} />
      </div>
    } else if (sinResultado1) {
      campoOfendido = <div className="">
        <label className="">Sin resultados...</label>
        <button className="" type="button" onClick={this.crearOfendido}>Crear Ofendido</button>
      </div>
    } else {
      campoOfendido = <button className="" onClick={this.buscarOfendido}>Cargar Ofendido</button>
    }

    return (
      <React.Fragment>
        <Menu />
        {this.state.NewCaso && (
          <div className="container">
            <form className="form" onSubmit={this.crearCasoHandler}>
              <legend className="legend">Crear Caso</legend>
              <div className="form-group">
                <label className="">Expediente</label>
                <input className="txti" type="text" ref={this.expedienteEl} />
              </div>
              <div className="form-group">
                <label className="">Juzgado</label>
                <input className="txti" type="text" ref={this.juzgadoEl} />
              </div>
              <div className="form-group">
                <input className="chk" type="checkbox" label="Desalojo del imputado" ref={this.desalojoEl} />
                <span className="">Desalojo del imputado</span>
              </div>
              <div className="form-group">
                <input className="chk" type="checkbox" label="Cambio de domicilio de víctima" ref={this.cambioDomicilioVictEl} />
                <span className="">Cambio de domicilio de víctima</span>
              </div>
              <div className="form-group">
                <input className="chk" type="checkbox" label="Notificación del imputado" ref={this.notifImputadoEl} />
                <span className="">Notificación del imputado</span>
              </div>
              <div className="form-group">
                <label className="">Fecha de notificación del imputado</label>
                <input className="txti" type="date" ref={this.f_notifImputadoEl} />
              </div>

              <div className="form-group">
                <input className="chk" type="checkbox" label="Notificación del ofendido" ref={this.notifOfendidoEl} />
                <span className="">Notificación del ofendido</span>
              </div>
              <div className="form-group">
                <label className="">Fecha de notificación del ofendido</label>
                <input className="txti" type="date" ref={this.f_notifOfendidoEl} />
              </div>
              <div className="form-group">
                <input className="chk" type="checkbox" label="Medidas de protección" ref={this.medidasProteccionEl} />
                <span className="">Medidas de protección</span>
              </div>
              <div className="form-group">
                <label className="">Fecha de emisión de las medidas</label>
                <input className="txti" type="date" ref={this.f_emisionMedidasEl} />
              </div>
              <div className="form-group">
                {campoImputado}
              </div>
              <div className="form-group">
                {campoOfendido}
              </div>
              <div className="form-group">
                <button className="submit-btn" type="submit">Guardar</button>
              </div>
            </form>
          </div>
        )}

        {this.state.FindImputado && (
          <div className="container">
            <form className="" onSubmit={this.buscarPersonaHandler}>
              <legend className="">Buscar Imputado</legend>
              <label className=""><h4>Ingrese identificación del imputado:</h4></label><hr></hr>
              <input type="text" className="" ref={this.PersonaIdentificacionEl} />
              <button className="" type="submit">Buscar</button>
            </form>
          </div>
        )}

        {this.state.FindOfendido && (
          <div className="container">
            <form className="" onSubmit={this.buscarPersonaHandler}>
              <legend className="">Buscar Ofendido</legend>
              <label className=""><h4>Ingrese identificación del ofendido:</h4></label><hr></hr>
              <input type="text" className="" ref={this.PersonaIdentificacionEl} />
              <button className="" type="submit">Buscar</button>
            </form>
          </div>
        )}

        {this.state.CreateImputado && (
          <div className="container">
            <form className="" onSubmit={this.crearPersonaHandler}>
              <legend className="">Crear Imputado</legend>
              <div className="">
                <label>Nombre</label>
                <input type="text" className="" ref={this.nombreEl} />
              </div>
              <div className="">
                <label>Identificación</label>
                <input type="text" className="" ref={this.PersonaIdentificacionEl} />
              </div>
              <div className="">
                <label>Fecha de nacimiento</label>
                <input type="date" className="" ref={this.f_nacimientoEl} />
              </div>
              <div className="">
                <label>Sexo</label>
                <select className="" ref={this.sexoEl}>
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>
              <div className="">
                <label>Edad</label>
                <input type="number" className="" ref={this.edadEl} />
              </div>
              <div className="">
                <label>Provincia</label>
                <input type="text" className="" ref={this.provinciaEl} />
              </div>
              <div className="">
                <label>cantón</label>
                <input type="text" className="" ref={this.cantonEl} />
              </div>
              <div className="">
                <label>Distrito</label>
                <input type="text" className="" ref={this.distritoEl} />
              </div>
              <div className="">
                <label>Dirección exacta</label>
                <textarea className="" ref={this.direccionEl} />
              </div>
              <button type="submit" className="">Guardar Persona</button>
            </form>
          </div>
        )}

        {this.state.CreateOfendido && (
          <div className="container">
            <form className="" onSubmit={this.crearPersonaHandler}>
              <legend className="">Crear Ofendido</legend>
              <div className="">
                <label>Nombre</label>
                <input type="text" className="" ref={this.nombreEl} />
              </div>
              <div className="">
                <label>Identificación</label>
                <input type="text" className="" ref={this.PersonaIdentificacionEl} />
              </div>
              <div className="">
                <label>Fecha de nacimiento</label>
                <input type="date" className="" ref={this.f_nacimientoEl} />
              </div>
              <div className="">
                <label>Sexo</label>
                <select className="" ref={this.sexoEl}>
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>
              <div className="">
                <label>Edad</label>
                <input type="number" className="" ref={this.edadEl} />
              </div>
              <div className="">
                <label>Provincia</label>
                <input type="text" className="" ref={this.provinciaEl} />
              </div>
              <div className="">
                <label>cantón</label>
                <input type="text" className="" ref={this.cantonEl} />
              </div>
              <div className="">
                <label>Distrito</label>
                <input type="text" className="" ref={this.distritoEl} />
              </div>
              <div className="">
                <label>Dirección exacta</label>
                <textarea className="" ref={this.direccionEl} />
              </div>
              <button type="submit" className="">Guardar Persona</button>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CreateCasoPage;
