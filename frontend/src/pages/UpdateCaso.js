import React, { Component } from 'react';

import Menu from '../components/Navigation/Menu';
import AuthContext from '../context/auth-context';
import server from '../components/Variable/Variable';

import './FindPerson.css';


class UpadateCasoPage extends Component {
  // Estados
  state = {
    server: server.server,
    Id: null,
    expediente: null,
    juzgado: null,
    f_notifImputado: null,
    f_notifOfendido: null,
    f_emisionMedidas: null,
    desalojoCh: null,
    cambioDomicilioCh: null,
    notifImputadoCh: null,
    notifOfendidoCh: null,
    medidasCh: null,
    buscarExpediente: true,
    modificarExpediente: false,
    Resultado: false,
    sinResultados: false
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
  };
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
  };

  cambioImputado = () => {
    this.setState({
      notifImputadoCh: !this.state.notifImputadoCh,
    });
  };

  cambioOfendido = () => {
    this.setState({
      notifOfendidoCh: !this.state.notifOfendidoCh,
    });
  };

  cambioMedidas = () => {
    this.setState({
      medidasCh: !this.state.medidasCh,
    });
  };

  EditarNuevoCaso = event => {
    event.preventDefault();
    this.setState({
      Id: null,
      expediente: null,
      juzgado: null,
      f_notifImputado: null,
      f_notifOfendido: null,
      f_emisionMedidas: null,
      desalojoCh: null,
      cambioDomicilioCh: null,
      notifImputadoCh: null,
      notifOfendidoCh: null,
      medidasCh: null,
      buscarExpediente: true,
      modificarExpediente: false,
      Resultado: false,
      sinResultados: false
    });
  };

  findCasoHandler = event => {
    event.preventDefault();
    const expediente = this.expedienteEl.current.value;
    const requestBody = {
      query: `
          query Expediente($expediente: String! ) {
            expediente(expediente: $expediente){
              _id
              expediente
              juzgado
              notifImputado
              f_notifImputado
              notifOfendido
              f_notifOfendido
              desalojo
              cambioDomicilioVict
              medidasProteccion
              f_emisionMedidas
            }
          }
        `,

      variables: {
        expediente: expediente
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
        if (resData === null) {
          this.setState({
            buscarExpediente: false,
            modificarExpediente: false,
            Resultado: false,
            sinResultados: true
          });
        }
        const Id = resData.data.expediente._id;
        const expediente = resData.data.expediente.expediente;
        const juzgado = resData.data.expediente.juzgado;
        const notifImputado = resData.data.expediente.notifImputado;
        const f_notifImputado = resData.data.expediente.f_notifImputado;
        const notifOfendido = resData.data.expediente.notifOfendido;
        const f_notifOfendido = resData.data.expediente.f_notifOfendido;
        const desalojo = resData.data.expediente.desalojo;
        const cambioDomicilioVict = resData.data.expediente.cambioDomicilioVict;
        const medidasProteccion = resData.data.expediente.medidasProteccion;
        const f_emisionMedidas = resData.data.expediente.f_emisionMedidas;
        console.log(resData.data.expediente.expediente);
        console.log(resData.data.expediente.f_notifImputado);

        if (this.isActive) {
          this.setState({
            Id: Id,
            expediente: expediente,
            juzgado: juzgado,
            notifImputadoCh: notifImputado,
            f_notifImputado: f_notifImputado,
            notifOfendidoCh: notifOfendido,
            f_notifOfendido: f_notifOfendido,
            desalojoCh: desalojo,
            cambioDomicilioCh: cambioDomicilioVict,
            medidasCh: medidasProteccion,
            f_emisionMedidas: f_emisionMedidas,
            buscarExpediente: false,
            modificarExpediente: true,
            Resultado: false,
            sinResultados: false
          });
        }
        console.log(this.state.cambioDomicilioCh);
        console.log(this.state.f_notifImputado);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          buscarExpediente: false,
          modificarExpediente: false,
          Resultado: false,
          sinResultados: true
        });
      });
  };

  // Manejador de eventos Actualizar Caso Query
  UpdateCasoHandler = event => {
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

    if (expediente.trim().length === 0 || juzgado.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
          mutation EditarCaso($expediente: String!, $juzgado: String!, $notifImputado: Boolean, $f_notifImputado: String, $notifOfendido: Boolean, $f_notifOfendido: String, $desalojo: Boolean, $cambioDomicilioVict: Boolean, $medidasProteccion: Boolean, $f_emisionMedidas: String) {
            editarCaso(expediente: $expediente, juzgado: $juzgado, notifImputado: $notifImputado, f_notifImputado: $f_notifImputado, notifOfendido: $notifOfendido, f_notifOfendido: $f_notifOfendido, desalojo: $desalojo, cambioDomicilioVict: $cambioDomicilioVict, medidasProteccion: $medidasProteccion,f_emisionMedidas: $f_emisionMedidas){
              expediente
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
        const expediente = resData.data.editarCaso.expediente;
        if (resData === null) {
          this.setState({
            buscarExpediente: false,
            modificarExpediente: false,
            Resultado: false,
            sinResultados: true
          });
        }
        if (this.isActive) {
          this.setState({
            expediente: expediente,
            buscarExpediente: false,
            modificarExpediente: false,
            Resultado: true,
            sinResultados: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          expediente: expediente,
          buscarExpediente: false,
          modificarExpediente: false,
          Resultado: false,
          sinResultados: true
        });
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  };

  render() {
    return (
      <React.Fragment>
        <Menu />
        {this.state.buscarExpediente && (
          <div className="container">
            <div className="findMain1Div">
              <form className="findForm" onSubmit={this.findCasoHandler}>
                <span className="findFormSpan">
                  Expediente:
                  </span>
                <input type="text" className="findFormInput" autoFocus={true} ref={this.expedienteEl} />
                <button className="findFormSubmit" type="submit" onClick={this.findCasoHandler}>
                  Buscar
              </button>
              </form>
            </div>
          </div>
        )}

        {this.state.modificarExpediente && (
          <div className="container">
            <form className="newCasoForm" onSubmit={this.UpdateCasoHandler}>
              <legend className="newCasoFormLegend">Actualizar expediente</legend>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Expediente</span>
                <input className="newCasoFormInput" type="text" defaultValue={this.state.expediente} ref={this.expedienteEl} />
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Juzgado</span>
                <input className="newCasoFormInput" type="text" defaultValue={this.state.juzgado} ref={this.juzgadoEl} />
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
                <input className="newCasoFormInput" type="text" defaultValue={this.state.f_notifImputado} ref={this.f_notifImputadoEl} />
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.notifOfendidoCh} onChange={this.cambioOfendido} className="newCasoFormCheck" type="checkbox" label="Notificación del ofendido" />
                <span className="newCasoFormSpan">Notificación del ofendido</span>
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Fecha de notificación del ofendido</span>
                <input className="newCasoFormInput" type="text" defaultValue={this.state.f_notifOfendido} ref={this.f_notifOfendidoEl} />
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.medidasCh} onChange={this.cambioMedidas} className="newCasoFormCheck" type="checkbox" label="Medidas de protección" />
                <span className="newCasoFormSpan">Medidas de protección</span>
              </div>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Fecha de emisión de las medidas</span>
                <input className="newCasoFormInput" type="text" defaultValue={this.state.f_emisionMedidas} ref={this.f_emisionMedidasEl} />
              </div>
              <button className="newCasoFormSubmit" type="submit">Actualizar</button>
            </form>
          </div>
        )}

        {this.state.sinResultados && (
          <div className="container">
            <div className="findMain1Div">
              <p className="newCasoFormP">No se encuentran registros asociados a ese número de Expediente</p>
              <button className="newCasoFormFindNew" onClick={this.EditarNuevoCaso}>Buscar nuevamente</button>
            </div>
          </div>
        )}

        {this.state.Resultado && (
          <div className="container">
            <div className="findMain1Div">
              <p className="newCasoFormP">El expediente {this.state.expediente}, ha sido actualizado...</p>
              <button className="newCasoFormFindNew" onClick={this.EditarNuevoCaso}>Actualizar Otro</button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  };

}
export default UpadateCasoPage;