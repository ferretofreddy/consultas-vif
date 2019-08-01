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
    Duplicado: false,
    imputadoId: null,
    imputadoIdentificacion: null,
    ofendidoId: null,
    ofendidoIdentificacion: null,
    expediente: null,
    desalojoCh: false,
    cambioDomicilioCh: false,
    notifImputadoCh: false,
    notifOfendidoCh: false,
    medidasCh: false
  };

  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.expedienteEl = React.createRef();
    this.juzgadoEl = React.createRef();
    this.f_notifImputadoEl = React.createRef();
    this.f_notifOfendidoEl = React.createRef();
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
  // modificar estados de los checkbox
  cambioDesalojo = () => {
    this.setState({
      desalojoCh: !this.state.desalojoCh,
    });
  }

  cambioDomicilio = () => {
    this.setState({
      cambioDomicilioCh: !this.state.cambioDomicilioCh,
    });
  }

  cambioImputado = () => {
    this.setState({
      notifImputadoCh: !this.state.notifImputadoCh,
    });
  }

  cambioOfendido = () => {
    this.setState({
      notifOfendidoCh: !this.state.notifOfendidoCh,
    });
  }

  cambioMedidas = () => {
    this.setState({
      medidasCh: !this.state.medidasCh,
    });
  }
  // Cambiar estado de nuevo caso
  nuevoCaso = event => {
    event.preventDefault();
    this.setState({
      Result: false,
      Duplicado: false,
      expediente: null,
      NewCaso: true,
      imputadoId: null,
      imputadoIdentificacion: null,
      ofendidoId: null,
      ofendidoIdentificacion: null,
      desalojoCh: false,
      cambioDomicilioCh: false,
      notifImputadoCh: false,
      notifOfendidoCh: false,
      medidasCh: false
    });
  };

  // Manejador de eventos Crear Caso Query
  crearCasoHandler = event => {
    event.preventDefault();
    const expediente = this.expedienteEl.current.value;
    const juzgado = this.juzgadoEl.current.value;
    const notifImputado = this.state.notifImputadoCh;
    const f_notifImputado = this.f_notifImputadoEl.current.value;
    const notifOfendido = this.state.notifOfendidoCh;
    const f_notifOfendido = this.f_notifOfendidoEl.current.value;
    const desalojo = this.state.desalojoCh;
    const cambioDomicilioVict = this.state.cambioDomicilioCh;
    const medidasProteccion = this.state.medidasCh;
    const f_emisionMedidas = this.f_emisionMedidasEl.current.value;
    const imputado = this.state.imputadoId;
    const ofendido = this.state.ofendidoId;


    if (expediente.trim().length === 0 || juzgado.trim().length === 0 || imputado.trim().length === 0 || ofendido.trim().length === 0) {
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
          this.setState({ Duplicado: true, expediente: this.expedienteEl.current.value });
          throw new Error('Error del servidor');
        }
        return res.json();
      })
      .then(resData => {
        const expediente = resData.data.crearCaso.expediente;
        if (resData === null) {
          this.setState({ Result: false });
        }
        if (this.isActive) {
          this.setState({
            expediente: expediente,
            Result: true,
            NewCaso: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ Result: false });
      });
  };

  // Modificador de estado en click buscar Imputado
  buscarImputado = event => {
    event.preventDefault();
    this.setState({ FindImputado: true, NewCaso: false });
  };

  // Modificador de estado en click buscar Ofendido
  buscarOfendido = event => {
    event.preventDefault();
    this.setState({ FindOfendido: true, NewCaso: false });
  };

  // Manejador de eventos para buscar personas Query
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
          }
        };
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Modificador de estado en click Crear Imputado
  crearImputado = event => {
    event.preventDefault();
    this.setState({ CreateImputado: true, ImputadoNonData: false, NewCaso: false });
  };

  // Modificador de estado en click Crear Ofendido
  crearOfendido = event => {
    event.preventDefault();
    this.setState({ CreateOfendido: true, OfendidoNonData: false, NewCaso: false });
  };

  // Manejador de eventos para crear persona Query
  crearPersonaHandler = event => {
    event.preventDefault();
    const nombre = this.nombreEl.current.value;
    const PersonaIdentificacion = this.PersonaIdentificacionEl.current.value;
    const f_nacimiento = this.f_nacimientoEl.current.value;
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
        <label className="findResultLabel">Identificacion del imputado:</label>
        <input className="findResultInput" defaultValue={this.state.imputadoIdentificacion} />
        <button className="findResultBtn" onClick={this.buscarImputado}>Cambiar</button>
      </div>
    }
    else if (sinResultado) {
      campoImputado = <div className="findPersonaBoxDiv">
        <span className="findPersonaSpan">Sin resultados...</span>
        <button className="findPersonaBtnBuscar" onClick={this.buscarImputado}>Buscar nuevamente</button>
        <button className="findPersonaBtnCrear" onClick={this.crearImputado}>Crear imputado</button>
      </div>
    }
    else {
      campoImputado = <div className="findPersonDiv">
        <button className="findPersonBtn" onClick={this.buscarImputado}>Buscar imputado</button>
      </div>
    }

    const datoOfendido = this.state.ofendidoId;
    const sinResultado1 = this.state.OfendidoNonData;
    let campoOfendido;
    if (datoOfendido !== null) {
      campoOfendido = <div className="">
        <label className="findResultLabel">Identificacion del ofendido:</label>
        <input className="findResultInput" defaultValue={this.state.ofendidoIdentificacion} />
        <button className="findResultBtn" onClick={this.buscarOfendido}>Cambiar</button>
      </div>
    } else if (sinResultado1) {
      campoOfendido = <div className="findPersonaBoxDiv">
        <span className="findPersonaSpan">Sin resultados...</span>
        <button className="findPersonaBtnBuscar" onClick={this.buscarOfendido}>Buscar nuevamente</button>
        <button className="findPersonaBtnCrear" type="button" onClick={this.crearOfendido}>Crear ofendido</button>
      </div>
    } else {
      campoOfendido = <div className="findPersonDiv">
        <button className="findPersonBtn" onClick={this.buscarOfendido}>Buscar ofendido</button>
      </div>
    }

    return (
      <React.Fragment>
        <Menu />
        {this.state.NewCaso && (
          <div className="container">
            <form className="newCasoForm" onSubmit={this.crearCasoHandler}>
              <legend className="newCasoFormLegend">Nuevo Expediente Judicial</legend>
              <div className="newCasoFormCampos">
                {campoImputado}
              </div>
              <div className="newCasoFormCampos">
                {campoOfendido}
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Expediente</span>
                <input className="newCasoFormInput" type="text" ref={this.expedienteEl} />
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Juzgado</span>
                <input className="newCasoFormInput" type="text" ref={this.juzgadoEl} />
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.desalojoCh} onChange={this.cambioDesalojo} className="newCasoFormCheck" type="checkbox" label="Desalojo del imputado" />
                <span className="newCasoFormSpan">Desalojo del imputado</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.cambioDomicilioCh} onChange={this.cambioDomicilio} className="newCasoFormCheck" type="checkbox" label="Cambio de domicilio de víctima" />
                <span className="newCasoFormSpan">Cambio de domicilio de víctima</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.notifImputadoCh} onChange={this.cambioImputado} className="newCasoFormCheck" type="checkbox" label="Notificación del imputado" />
                <span className="newCasoFormSpan">Notificación del imputado</span>
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Fecha de notificación del imputado</span>
                <input className="newCasoFormInput" type="date" ref={this.f_notifImputadoEl} />
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.notifOfendidoCh} onChange={this.cambioOfendido} className="newCasoFormCheck" type="checkbox" label="Notificación del ofendido" />
                <span className="newCasoFormSpan">Notificación del ofendido</span>
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Fecha de notificación del ofendido</span>
                <input className="newCasoFormInput" type="date" ref={this.f_notifOfendidoEl} />
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.medidasCh} onChange={this.cambioMedidas} className="newCasoFormCheck" type="checkbox" label="Medidas de protección" />
                <span className="newCasoFormSpan">Medidas de protección</span>
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Fecha de emisión de las medidas</span>
                <input className="newCasoFormInput" type="date" ref={this.f_emisionMedidasEl} />
              </div>
              <button className="newCasoFormSubmit" type="submit">Guardar</button>
            </form>
          </div>
        )}

        {this.state.FindImputado && (
          <div className="container">
            <div className="casoFindBox">
              <legend className="casoFindLegend">Buscar Imputado</legend>
              <form className="findForm" onSubmit={this.buscarPersonaHandler}>
                <span className="findFormSpan">Ingrese identificación del imputado:</span>
                <input type="text" className="findFormInput" autoFocus={true} ref={this.PersonaIdentificacionEl} />
                <button className="findFormSubmit" type="submit">Buscar</button>
              </form>
            </div>
          </div>
        )}

        {this.state.FindOfendido && (
          <div className="container">
            <div className="casoFindBox">
              <legend className="casoFindLegend">Buscar Ofendido</legend>
              <form className="findForm" onSubmit={this.buscarPersonaHandler}>
                <span className="findFormSpan">Ingrese identificación del ofendido:</span>
                <input type="text" className="findFormInput" ref={this.PersonaIdentificacionEl} />
                <button className="findFormSubmit" type="submit">Buscar</button>
              </form>
            </div>
          </div>
        )}

        {this.state.CreateImputado && (
          <div className="container">
            <div className='FormHeader'>
              <h2 className="FormHeaderH2">Crear Imputado</h2>
            </div>
            <div className='FormBody'>
              <form className="FormSubmit" onSubmit={this.crearPersonaHandler}>
                <div className='FormBodyRow'>
                  <div className="FormBodyGroup">
                    <span>Nombre</span>
                    <input type="text" className="" ref={this.nombreEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Identificación</span>
                    <input type="" className="" ref={this.PersonaIdentificacionEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Fecha de nacimiento</span>
                    <input type="date" className="" ref={this.f_nacimientoEl} />
                  </div>
                </div>
                <div className='FormBodyRow'>
                  <div className="FormBodyGroup">
                    <span>Sexo</span>
                    <select className="" ref={this.sexoEl}>
                      <option>Masculino</option>
                      <option>Femenino</option>
                    </select>
                  </div>
                  <div className="FormBodyGroup">
                    <span>Edad</span>
                    <input type="number" className="" ref={this.edadEl} />
                  </div>
                </div>
                <div className='FormBodyRow'>
                  <div className="FormBodyGroup">
                    <span>Provincia</span>
                    <input type="text" className="" ref={this.provinciaEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Cantón</span>
                    <input type="text" className="" ref={this.cantonEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Distrito</span>
                    <input type="text" className="" ref={this.distritoEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Dirección exacta</span>
                    <textarea className="" ref={this.direccionEl} />
                  </div>
                </div>
                <button type="submit" className="CreateFormBtn">Guardar Persona</button>
              </form>
            </div>
          </div>
        )}

        {this.state.CreateOfendido && (
          <div className="container">
            <div className='FormHeader'>
              <h2 className="FormHeaderH2">Crear Ofendido</h2>
            </div>
            <div className='FormBody'>
              <form className="FormSubmit" onSubmit={this.crearPersonaHandler}>
                <div className='FormBodyRow'>
                  <div className="FormBodyGroup">
                    <span>Nombre</span>
                    <input type="text" className="" ref={this.nombreEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Identificación</span>
                    <input type="" className="" ref={this.PersonaIdentificacionEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Fecha de nacimiento</span>
                    <input type="date" className="" ref={this.f_nacimientoEl} />
                  </div>
                </div>
                <div className='FormBodyRow'>
                  <div className="FormBodyGroup">
                    <span>Sexo</span>
                    <select className="" ref={this.sexoEl}>
                      <option>Masculino</option>
                      <option>Femenino</option>
                    </select>
                  </div>
                  <div className="FormBodyGroup">
                    <span>Edad</span>
                    <input type="number" className="" ref={this.edadEl} />
                  </div>
                </div>
                <div className='FormBodyRow'>
                  <div className="FormBodyGroup">
                    <span>Provincia</span>
                    <input type="text" className="" ref={this.provinciaEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Cantón</span>
                    <input type="text" className="" ref={this.cantonEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Distrito</span>
                    <input type="text" className="" ref={this.distritoEl} />
                  </div>
                  <div className="FormBodyGroup">
                    <span>Dirección exacta</span>
                    <textarea className="" ref={this.direccionEl} />
                  </div>
                </div>
                <button type="submit" className="CreateFormBtn">Guardar Persona</button>
              </form>
            </div>
          </div>
        )}

        {this.state.Result && (
          <div className="container">
            <form className="">
              <div className="">
                <label className="">El expediente {this.state.expediente}, ha sido guardado...</label>
                <button className="" onClick={this.nuevoCaso}>Nuevo expediente</button>
              </div>
            </form>
          </div>
        )}

        {this.state.Duplicado && (
          <div className="container">
            <form className="">
              <div className="">
                <label className="">Ya existe un registro con el número de expediente: {this.state.expediente}</label>
                <button className="" onClick={this.nuevoCaso}>Nuevo expediente</button>
              </div>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CreateCasoPage;
