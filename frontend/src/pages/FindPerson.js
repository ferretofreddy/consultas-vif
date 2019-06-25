import React, { Component } from 'react';

import Menu from '../components/Navigation/Menu';
import CasoList from '../components/Caso/CasoList';
import InformeList from '../components/Informe/InformeList';
import AuthContext from '../context/auth-context';
import server from '../components/Variable/Variable';

import './FindPerson.css';


class FindPersonPage extends Component {
  // Estados
  state = {
    server: server.server,
    listar: false,
    sinResultados: false,
    buscar: true,
    selectedCaso: null,
    selectedInforme: null,
    casos: [],
    informes: [],
    identificacion: null,
    nombre: null,
    fechaNacimiento: null,
    provincia: null,
    canton: null,
    distrito: null,
    direccion: null
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.identificacionEl = React.createRef();

  }

  submitHandler = event => {
    event.preventDefault();
    const identificacion = this.identificacionEl.current.value;

    this.setState({ listar: false, buscar: true, sinResultados: false });
    const requestBody = {
      query: `
          query BuscarPersona($identificacion: String! ) {
            buscarPersona(identificacion: $identificacion){
              identificacion
              nombre
              f_nacimiento
              provincia
              canton
              distrito
              direccion
              casos{
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
                ofendido{
                  _id
                  nombre
                  identificacion
                }
                imputado{
                  _id
                  nombre
                  identificacion
                }
              }
              informes{
                _id
                nInforme
                f_informe
                aprehendido
                casoCLAIS
                decA_Blanca
                decA_Fuego
                trasladoFiscalia
                primerizo
                casoPorDesovediencia
                ofendido{
                  _id
                  nombre
                  identificacion
                }
                imputado{
                  _id
                  nombre
                  identificacion
                }
              }
            }
          }
        `,

      variables: {
        identificacion: identificacion
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
          this.setState({ listar: false, sinResultados: true });
        }
        const casos = resData.data.buscarPersona.casos;
        const informes = resData.data.buscarPersona.informes;
        const identificacion = resData.data.buscarPersona.identificacion;
        const nombre = resData.data.buscarPersona.nombre;
        const fechaNacimiento = resData.data.buscarPersona.f_nacimiento;
        const provincia = resData.data.buscarPersona.provincia;
        const canton = resData.data.buscarPersona.canton;
        const distrito = resData.data.buscarPersona.distrito;
        const direccion = resData.data.buscarPersona.direccion;
        console.log(resData.data.buscarPersona.casos);

        if (this.isActive) {
          this.setState({
            casos: casos,
            informes: informes,
            listar: true,
            buscar: true,
            identificacion: identificacion,
            nombre: nombre,
            fechaNacimiento: fechaNacimiento,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            direccion: direccion
          });
        }
        console.log(casos);
        console.log(informes);
      })
      .catch(err => {
        console.log(err);
        this.setState({ listar: false, sinResultados: true });
      });
  };

  showCasoHandler = casoId => {
    this.setState(prevState => {
      const selectedCaso = prevState.casos.find(e => e._id === casoId);
      return { selectedCaso: selectedCaso, buscar: false };

    });
  };

  unselectedCaso = event => {
    event.preventDefault();
    this.setState({ selectedCaso: null, buscar: true });
  };

  showInformeHandler = informeId => {
    this.setState(prevState => {
      const selectedInforme = prevState.informes.find(i => i._id === informeId);
      return { selectedInforme: selectedInforme, buscar: false };
    });
  };

  unselectedInforme = event => {
    event.preventDefault();
    this.setState({ selectedInforme: null, buscar: true });
  };

  componentWillUnmount() {
    this.isActive = false;
  };

  render() {
    return (
      <React.Fragment>
        <Menu />
        {this.state.selectedCaso && (
          <div className="container">
            <div className="findCasoHeader">
              <h2 className="findExpedienteHeaderH2">Expediente Judicial N° {this.state.selectedCaso.expediente}</h2>
            </div>
            <div className="findSecondPersonalesDiv">
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Juzgado</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.juzgado} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Medidas de Proteccion</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.medidasProteccion ? ("Se solicitaron") : ("No se solicitaron")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Fecha de emisión medidas</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.medidasProteccion ? (new Date(this.state.selectedCaso.f_emisionMedidas).toLocaleDateString()) : ("Sin Datos")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Nombre del Imputado</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.imputado.nombre} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Identificación del Imputado</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.imputado.identificacion} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Nombre del Ofendido</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.ofendido.nombre} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Identificación del Ofendido</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.ofendido.identificacion} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Notificación del Imputado</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.notifImputado ? ("Imputado fue notificado") : ("Imputado sin notificar")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Fecha de notificación del Imputado</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.notifImputado ? (new Date(this.state.selectedCaso.f_notifImputado).toLocaleDateString()) : ("Sin Datos")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Notificación del Ofendido</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.notifOfendido ? ("Ofendido fue notificado") : ("Ofendido sin notificar")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Fecha de notificación del Ofendido</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.notifOfendido ? new Date(this.state.selectedCaso.f_notifOfendido).toLocaleDateString() : ("Sin Datos")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Desalojo del Imputado</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.desalojo ? ("Se preacticó desalojo") : ("No se practicó desalojo")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Cambio de Domicilio de Víctima</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedCaso.cambioDomicilioVict ? ("Cambió de domicilio") : ("No cambió de domicilio")} />
              </div>
              <buttom className="findFormInformeSubmit" variant="outline-primary" onClick={this.unselectedCaso}>
                cerrar
        </buttom>
            </div>
          </div>
        )}

        {this.state.selectedInforme && (
          <div className="container">
            <div className="findCasoHeader">
              <h2 className="findInformeHeaderH2">Informe Policial N° {this.state.selectedInforme.nInforme}</h2>
            </div>
            <div className="findSecondPersonalesDiv">
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Fecha del informe</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={new Date(this.state.selectedInforme.f_informe).toLocaleDateString()} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Aprehendido</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.aprehendido ? ("Imputado aprehendido") : ("Imputado sin aprehender")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Caso CLAIS</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.casoCLAIS ? ("Es caso CLAIS") : ("No es caso CLAIS")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Nombre del Imputado</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.imputado.nombre} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Identificacion del Imputado</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.imputado.identificacion} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Nombre del Ofendido</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.ofendido.nombre} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Identificacion del Ofendido</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.ofendido.identificacion} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Decomiso arma blanca</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.decA_Blanca ? ("Se decomisó") : ("No se decomisó")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Decomiso arma de fuego</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.decA_Fuego ? ("Se decomisó") : ("No se decomisó")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Traslado a fiscalia</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.trasladoFiscalia ? ("Imputado trasladado") : ("Imputado no trasladado")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Primerizo</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.primerizo ? ("Imputado primerizo") : ("Imputado no primerizo")} />
              </div>
              <div className="findSecondPersonalesDivGroup" >
                <span className="PersonalesGroupSpan">Caso por desobediencia</span>
                <input className="PersonalesGroupInput" readOnly defaultValue={this.state.selectedInforme.casoPorDesovediencia ? ("Caso por desobediencia") : ("No es caso por desobediencia")} />
              </div>
              <buttom className="findFormInformeSubmit" onClick={this.unselectedInforme}>
                cerrar
              </buttom>
            </div>
          </div>
        )}

        {this.state.buscar && (
          <div className="container">
            <div className="findMain1Div">
              <form className="findForm" onSubmit={this.submitHandler}>
                <span className="findFormSpan">
                  Identificación:
                </span>
                <input type="text" className="findFormInput" ref={this.identificacionEl} />
                <buttom className="findFormSubmit" type="submit" onClick={this.submitHandler}>
                  Buscar
            </buttom>
              </form>
            </div>
            <div className="findMain2Div">
              {this.state.listar && (
                <div className="findSecond1Div">
                  <div className="findSecondPersonalesDiv">
                    <div className="findSecondPersonalesDivGroup" >
                      <span className="PersonalesGroupSpan">Identificación</span>
                      <input type="text" className="PersonalesGroupInput" readOnly defaultValue={this.state.identificacion} />
                    </div>
                    <div className="findSecondPersonalesDivGroup" >
                      <span className="PersonalesGroupSpan">Nombre</span>
                      <input type="text" className="PersonalesGroupInput" readOnly defaultValue={this.state.nombre} />
                    </div>

                    <div className="findSecondPersonalesDivGroup" >
                      <span className="PersonalesGroupSpan">Fecha de nacimiento</span>
                      <input type="text" className="PersonalesGroupInput" readOnly defaultValue={new Date(this.state.fechaNacimiento).toLocaleDateString()} />
                    </div>
                    <div className="findSecondPersonalesDivGeneral" >
                      <h4 className="PersonalesGroupH4">Domicilio</h4>
                    </div>

                    <div className="findSecondPersonalesDivGroup" >
                      <span className="PersonalesGroupSpan">Provincia</span>
                      <input type="text" className="PersonalesGroupInput" readOnly defaultValue={this.state.provincia} />
                    </div>

                    <div className="findSecondPersonalesDivGroup" >
                      <span className="PersonalesGroupSpan">Cantón</span>
                      <input type="text" className="PersonalesGroupInput" readOnly defaultValue={this.state.canton} />
                    </div>

                    <div className="findSecondPersonalesDivGroup" >
                      <span className="PersonalesGroupSpan">Distrito</span>
                      <input type="text" className="PersonalesGroupInput" readOnly defaultValue={this.state.distrito} />
                    </div>

                    <div className="findSecondPersonalesDivGroup">
                      <span className="PersonalesGroupSpan">Dirección exacta</span>
                      <textarea type="textarea" className="PersonalesGroupTextArea" readOnly defaultValue={this.state.direccion} />
                    </div>
                  </div>
                  <div className="findSecondJudicialesDiv">
                    <div className="findSecondJudicialesGroup">
                      <h3 className="findSecondJudicialesH3">Expedientes judiciales asociados</h3>
                    </div>
                    <div className="findSecondJudicialesGroup">
                      <CasoList
                        casos={this.state.casos}
                        onViewDetail={this.showCasoHandler}
                      />
                    </div>
                  </div>
                  <div className="findSecondJudicialesDiv">
                    <div className="findSecondJudicialesGroup">
                      <h3 className="findSecondJudicialesH3">Informes policiales asociados</h3>
                    </div>
                    <div className="findSecondJudicialesGroup">
                      <InformeList
                        informes={this.state.informes}
                        viewDetail={this.showInformeHandler}
                      />
                    </div>
                  </div>
                </div>
              )}
              {this.state.sinResultados && (
                    <div className="findSecond2Div">
                      <p>No se encuentran registros asociados a ese número de identificación</p>
                    </div>)}

            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default FindPersonPage;
