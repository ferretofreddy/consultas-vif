import React, { Component } from 'react';

import Menu from '../components/Navigation/Menu';
import AuthContext from '../context/auth-context';
import server from '../components/Variable/Variable';

import './CreateInforme.css';

class CreateInformePage extends Component {
  state = {
    server: server.server,
    NewInforme: true,
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
    nInforme: null,
    f_informe: null,
    imputadoNombre: null,
    ofendidoNombre: null,
    // checkBoxs del formulario
    aprehendidoCh: false,
    casoCLAISCh: false,
    decA_BlancaCh: false,
    decA_FuegoCh: false,
    trasladoFiscaliaCh: false,
    primerizoCh: false,
    casoPorDesovedienciaCh: false
  };

  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nInformeEl = React.createRef();
    this.f_informeEl = React.createRef();
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
  cambioAprehendido = () => {
    this.setState({
      aprehendidoCh: !this.state.aprehendidoCh,
    });
    console.log(this.state.aprehendidoCh);
  }

  cambioCasoCLAIS = () => {
    this.setState({
      casoCLAISCh: !this.state.casoCLAISCh,
    });
  }

  cambioDecA_Blanca = () => {
    this.setState({
      decA_BlancaCh: !this.state.decA_BlancaCh,
    });
  }

  cambioDecA_Fuego = () => {
    this.setState({
      decA_FuegoCh: !this.state.decA_FuegoCh,
    });
  }

  cambioTrasladoFiscalia = () => {
    this.setState({
      trasladoFiscaliaCh: !this.state.trasladoFiscaliaCh,
    });
  }

  cambioPrimerizo = () => {
    this.setState({
      primerizoCh: !this.state.primerizoCh,
    });
  }

  cambioCasoPorDesovediencia = () => {
    this.setState({
      casoPorDesovedienciaCh: !this.state.casoPorDesovedienciaCh,
    });
  }
  // Manejador de eventos Nuevo informe para crear nuevo informe
  nuevoInforme = event => {
    event.preventDefault();
    this.setState({
      Result: false,
      Duplicado: false,
      NewInforme: true,
      imputadoId: null,
      imputadoIdentificacion: null,
      ofendidoId: null,
      ofendidoIdentificacion: null,
      aprehendidoCh: false,
      casoCLAISCh: false,
      decA_BlancaCh: false,
      decA_FuegoCh: false,
      trasladoFiscaliaCh: false,
      primerizoCh: false,
      casoPorDesovedienciaCh: false
    });
  };

  // Manejador de eventos Crear Caso Query
  CrearInformeHandler = event => {
    event.preventDefault();
    const nInforme = this.nInformeEl.current.value;
    const f_informe = this.f_informeEl.current.value;
    const aprehendido = this.state.aprehendidoCh;
    const casoCLAIS = this.state.casoCLAISCh;
    const decA_Blanca = this.state.decA_BlancaCh;
    const decA_Fuego = this.state.decA_FuegoCh;
    const trasladoFiscalia = this.state.trasladoFiscaliaCh;
    const primerizo = this.state.primerizoCh;
    const casoPorDesovediencia = this.state.casoPorDesovedienciaCh;
    const imputado = this.state.imputadoId;
    const ofendido = this.state.ofendidoId;


    if (nInforme.trim().length === 0 || f_informe.trim().length === 0 || imputado.trim().length === 0 || ofendido.trim().length === 0) {
      return;
    }

    this.setState({ NewInforme: false });
    console.log(imputado);
    console.log(ofendido);

    const requestBody = {
      query: `
          mutation CrearInforme($nInforme: String!, $f_informe: String!, $aprehendido: Boolean, $casoCLAIS: Boolean, $decA_Blanca: Boolean, $decA_Fuego: Boolean, $trasladoFiscalia: Boolean, $primerizo: Boolean, $casoPorDesovediencia: Boolean, $imputado: String!, $ofendido: String!) {
            crearInforme(informeInput:{nInforme: $nInforme, f_informe: $f_informe, aprehendido: $aprehendido, casoCLAIS: $casoCLAIS, decA_Blanca: $decA_Blanca, decA_Fuego: $decA_Fuego, trasladoFiscalia: $trasladoFiscalia, primerizo: $primerizo, casoPorDesovediencia: $casoPorDesovediencia,  imputado: $imputado, ofendido: $ofendido})
            {
              nInforme
              f_informe
              ofendido{
                nombre
                identificacion
              }
              imputado{
                nombre
                identificacion
              }
            }
          }
        `,

      variables: {
        nInforme: nInforme,
        f_informe: new Date(f_informe).toISOString(),
        aprehendido: aprehendido,
        casoCLAIS: casoCLAIS,
        decA_Blanca: decA_Blanca,
        decA_Fuego: decA_Fuego,
        trasladoFiscalia: trasladoFiscalia,
        primerizo: primerizo,
        casoPorDesovediencia: casoPorDesovediencia,
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
          this.setState({ Duplicado: true, expediente: this.nInformeEl.current.value });
          throw new Error('Error de servidor!');
        }
        return res.json();
      })
      .then(resData => {
        const nInforme = resData.data.crearInforme.nInforme;
        const f_informe = resData.data.crearInforme.f_informe;
        const imputadoNombre = resData.data.crearInforme.imputado.nombre;
        const ofendidoNombre = resData.data.crearInforme.ofendido.nombre;
        console.log(imputadoNombre);
        if (resData === null) {
          this.setState({ Result: false });
        }
        if (this.isActive) {
          this.setState({
            nInforme: nInforme,
            f_informe: f_informe,
            imputadoNombre: imputadoNombre,
            ofendidoNombre: ofendidoNombre,
            Result: true,
            NewInforme: false
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
    this.setState({ FindImputado: true, NewInforme: false });
  };

  // Modificador de estado en click buscar Ofendido
  buscarOfendido = event => {
    event.preventDefault();
    this.setState({ FindOfendido: true, NewInforme: false });
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
        console.log(resData);
        if (this.state.FindImputado) {

          if (resData.data.buscarPersona === null) {
            this.setState({ imputadoId: null, imputadoIdentificacion: null, FindImputado: false, NewInforme: true, ImputadoNonData: true });
            return;
          }

          const personaId = resData.data.buscarPersona._id;
          const personaIdentificacion = resData.data.buscarPersona.identificacion;
          if (this.isActive) {
            this.setState({
              imputadoId: personaId,
              imputadoIdentificacion: personaIdentificacion,
              NewInforme: true,
              FindImputado: false
            });
            console.log(this.state.imputadoIdentificacion);
          }
        };
        if (this.state.FindOfendido) {

          if (resData.data.buscarPersona === null) {
            this.setState({ ofendidoId: null, ofendidoIdentificacion: null, FindOfendido: false, NewInforme: true, OfendidoNonData: true });
            return;
          }

          const personaId = resData.data.buscarPersona._id;
          const personaIdentificacion = resData.data.buscarPersona.identificacion;
          if (this.isActive) {
            this.setState({
              ofendidoId: personaId,
              ofendidoIdentificacion: personaIdentificacion,
              NewInforme: true,
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

  // Modificador de estado en click Crear Imputado
  crearImputado = event => {
    event.preventDefault();
    this.setState({ CreateImputado: true, ImputadoNonData: false, NewInforme: false });
  };

  // Modificador de estado en click Crear Ofendido
  crearOfendido = event => {
    event.preventDefault();
    this.setState({ CreateOfendido: true, OfendidoNonData: false, NewInforme: false });
  };

  // Manejador de eventos para crear persona Query
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
              imputadoId: personaId, imputadoIdentificacion: personaIdentificacion, CreateImputado: false, NewInforme: true
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
              ofendidoId: personaId, ofendidoIdentificacion: personaIdentificacion, CreateOfendido: false, NewInforme: true
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
        <label className="findResultLabel">Identificacion del imputado:</label>
        <input className="findResultInput" defaultValue={this.state.imputadoIdentificacion} />
        <button className="findResultBtn" onClick={this.buscarImputado}>Buscar Imputado</button>
      </div>
    }
    else if (sinResultado) {
      campoImputado = <div className="findPersonaBoxDiv">
        <span className="findPersonaSpan">Sin resultados...</span>
        <button className="findPersonaBtnBuscar" onClick={this.buscarImputado}>Buscar Imputado</button>
        <button className="findPersonaBtnCrear" onClick={this.crearImputado}>Crear Imputado</button>
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
        <button className="findResultBtn" onClick={this.buscarOfendido}>Buscar Ofendido</button>
      </div>
    } else if (sinResultado1) {
      campoOfendido = <div className="findPersonaBoxDiv">
        <span className="findPersonaSpan">Sin resultados...</span>
        <button className="findPersonaBtnBuscar" onClick={this.buscarOfendido}>Buscar Ofendido</button>
        <button className="findPersonaBtnCrear" type="button" onClick={this.crearOfendido}>Crear Ofendido</button>
      </div>
    } else {
      campoOfendido = <div className="findPersonDiv">
        <button className="findPersonBtn" onClick={this.buscarOfendido}>Buscar ofendido</button>
      </div>
    }

    return (
      <React.Fragment>
        <Menu />
        {this.state.NewInforme && (
          <div className="container">
            <form className="newCasoForm" onSubmit={this.CrearInformeHandler}>
              <legend className="newCasoFormLegend">Nuevo Informe Policial</legend>
              <div className="newCasoFormCampos">
                {campoImputado}
              </div>
              <div className="newCasoFormCampos">
                {campoOfendido}
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Informe Policial</span>
                <input className="newCasoFormInput" type="text" ref={this.nInformeEl} />
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Fecha del Informe</span>
                <input className="newCasoFormInput" type="date" ref={this.f_informeEl} />
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.aprehendidoCh} onChange={this.cambioAprehendido} className="newCasoFormCheck" type="checkbox" label="Imputado es aprehendido" />
                <span className="newCasoFormSpan">Imputado es aprehendido</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.casoCLAISCh} onChange={this.cambioCasoCLAIS} className="newCasoFormCheck" type="checkbox" label="Es caso CLAIS" />
                <span className="newCasoFormSpan">Es caso CLAIS</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.decA_BlancaCh} onChange={this.cambioDecA_Blanca} className="newCasoFormCheck" type="checkbox" label="Decomiso de arma blanca" />
                <span className="newCasoFormSpan">Decomiso de arma blanca</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.decA_FuegoCh} onChange={this.cambioDecA_Fuego} className="newCasoFormCheck" type="checkbox" label="Decomiso de arma de fuego" />
                <span className="newCasoFormSpan">Decomiso de arma de fuego</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.trasladoFiscaliaCh} onChange={this.cambioTrasladoFiscalia} className="newCasoFormCheck" type="checkbox" label="Imputado trasladado a fiscalia" />
                <span className="newCasoFormSpan">Imputado trasladado a fiscalia</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.primerizoCh} onChange={this.cambioPrimerizo} className="newCasoFormCheck" type="checkbox" label="Es primerizo" />
                <span className="newCasoFormSpan">Es primerizo</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.casoPorDesovedienciaCh} onChange={this.cambioCasoPorDesovediencia} className="newCasoFormCheck" type="checkbox" label="Es caso por desobediencia" />
                <span className="newCasoFormSpan">Es caso por desobediencia</span>
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
                <input type="text" className="findFormInput" autoFocus="true" ref={this.PersonaIdentificacionEl} />
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
                <label className="">El informe {this.state.nInforme}, ha sido guardado...</label>
                <button className="" onClick={this.nuevoInforme}>Nuevo informe</button>
              </div>
            </form>
          </div>
        )}

        {this.state.Duplicado && (
          <div className="container">
            <form className="">
              <div className="">
                <label className="">Ya existe un registro con el número de informe: {this.state.nInforme}</label>
                <button className="" onClick={this.nuevoInforme}>Nuevo expediente</button>
              </div>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CreateInformePage;
