import React, { Component } from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';

import MainNavigation from '../components/Navigation/MainNavigation';
import CasoList from '../components/Caso/CasoList';
import InformeList from '../components/Informe/InformeList';
import AuthContext from '../context/auth-context';

import './FindPerson.css';


class FindPerson extends Component {
  state = {
    listar: false,
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

    this.setState({ listar: false, buscar: true });
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
                imputado{
                  nombre
                  identificacion
                }
                ofendido{
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
          }
        `,

      variables: {
        identificacion: identificacion
      }

    }

    const token = this.context.token;

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const casos = resData.data.buscarPersona.casos;
        const informes = resData.data.buscarPersona.informes;
        const identificacion = resData.data.buscarPersona.identificacion;
        const nombre = resData.data.buscarPersona.nombre;
        const fechaNacimiento = resData.data.buscarPersona.f_nacimiento;
        const provincia = resData.data.buscarPersona.provincia;
        const canton = resData.data.buscarPersona.canton;
        const distrito = resData.data.buscarPersona.distrito;
        const direccion = resData.data.buscarPersona.direccion;
        if (resData === null) {
          this.setState({ listar: false });
        }
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
      })
      .catch(err => {
        console.log(err);
        this.setState({ listar: false });
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
        <MainNavigation />
        {this.state.selectedCaso && (
          <Card className="col-lg-10 text-white bg-dark mx-auto mt-5 pb-3">
            <div className="mt-2 mb-2">
              <h2 className="text-white">Expediente Judicial N° {this.state.selectedCaso.expediente}</h2>
            </div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Juzgado</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.juzgado} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Medidas de Proteccion</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.medidasProteccion ? ("Cuenta con medidas de potección") : ("No cuenta con medidas de potección")} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Fecha de emisión medidas</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.medidasProteccion ? (new Date(this.state.selectedCaso.f_emisionMedidas).toLocaleDateString()) : ("Sin Datos")} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Nombre del Imputado</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.imputado.nombre} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Identificación del Imputado</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.imputado.identificacion} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Nombre del Ofendido</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.ofendido.nombre} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Identificación del Ofendido</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.ofendido.identificacion} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Notificación del Imputado</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.notifImputado ? ("Imputado fue notificado") : ("Imputado sin notificar")} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Fecha de notificación del Imputado</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.notifImputado ? (new Date(this.state.selectedCaso.f_notifImputado).toLocaleDateString()) : ("Sin Datos")} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Notificación del Ofendido</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.notifOfendido ? ("Ofendido fue notificado") : ("Ofendido sin notificar")} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Fecha de notificación del Ofendido</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.notifOfendido ? new Date(this.state.selectedCaso.f_notifOfendido).toLocaleDateString() : ("Sin Datos")} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Desalojo del Imputado</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.desalojo ? ("Se preacticó desalojo") : ("No se practicó desalojo")} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Cambbio de Domicilio de Víctima</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedCaso.cambioDomicilioVict ? ("Víctima cambió de domicilio") : ("Víctima No cambió de domicilio")} />
                </Form.Group>
              </Form.Row>
              <Button className="mt-1 mb-1" variant="outline-primary" onClick={this.unselectedCaso}>
                cerrar
              </Button>
            </Form>
          </Card>
        )}

        {this.state.selectedInforme && (
          <Card className="col-lg-10 text-white bg-dark mx-auto mt-5 pb-3">
            <div className="mt-2 mb-2">
              <h2 className="text-white">Informe Policial N° {this.state.selectedInforme.nInforme}</h2>
            </div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Fecha del informe</Form.Label>
                  <Form.Control readOnly defaultValue={new Date(this.state.selectedInforme.f_informe).toLocaleDateString()} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Aprehendido</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.aprehendido ? ("Imputado aprehendido") : ("Imputado sin aprehender")} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Caso CLAIS</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.casoCLAIS ? ("Es caso CLAIS") : ("No es caso CLAIS")} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Nombre del Imputado</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.imputado.nombre} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Identificacion del Imputado</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.imputado.identificacion} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Nombre del Ofendido</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.ofendido.nombre} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Identificacion del Ofendido</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.ofendido.identificacion} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Decomiso arma blanca</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.decA_Blanca ? ("Se decomisó arma blnaca") : ("No se decomisó arma blanca")} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Decomiso arma de fuego</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.decA_Fuego ? ("Se decomisó arma de fuego") : ("No se decomisó arma de fuego")} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>Traslado a fiscalia</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.trasladoFiscalia ? ("Imputado fue trasladado") : ("Imputado no fue trasladado")} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Primerizo</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.primerizo ? ("Imputado es primerizo") : ("Imputado no es primerizo")} />
                </Form.Group>

                <Form.Group as={Col} >
                  <Form.Label>Caso por desobediencia</Form.Label>
                  <Form.Control readOnly defaultValue={this.state.selectedInforme.casoPorDesovediencia ? ("Es caso por desobediencia") : ("No es caso por desobediencia")} />
                </Form.Group>
              </Form.Row>
              <Button className="mt-1 mb-1" variant="outline-primary" onClick={this.unselectedInforme}>
                cerrar
              </Button>
            </Form>
          </Card>
        )}

        {this.state.buscar && (
          <Card className={this.state.listar ? ("col-lg-10 text-white bg-dark mx-auto mt-5") : ("col-lg-6 text-white bg-dark mx-auto mt-5")}>
            <Card.Header className="col-md-12">
              <Form className="mx-auto" inline onSubmit={this.submitHandler}>
                <Form.Label className="col-lg-5 mx-auto"> <h4>Identificación: </h4> </Form.Label><hr></hr>
                <Form.Control as='input' id="identificacion" type="text" className="mr-sm-2 col-lg-4 mx-auto" ref={this.identificacionEl} />
                <Button className="col-lg-2 mx-auto" variant="outline-primary" type="submit">
                  Buscar
            </Button>
              </Form>
            </Card.Header>
            <Card.Body>
              {this.state.listar ? (
                <div>
                  <Form>
                    <Form.Row>
                      <Form.Group as={Col} >
                        <Form.Label>Identificación</Form.Label>
                        <Form.Control readOnly defaultValue={this.state.identificacion} />
                      </Form.Group>

                      <Form.Group as={Col} >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control readOnly defaultValue={this.state.nombre} />
                      </Form.Group>

                      <Form.Group as={Col} >
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control readOnly defaultValue={new Date(this.state.fechaNacimiento).toLocaleDateString()} />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} >
                        <Form.Label>Provincia</Form.Label>
                        <Form.Control readOnly defaultValue={this.state.provincia} />
                      </Form.Group>

                      <Form.Group as={Col} >
                        <Form.Label>Cantón</Form.Label>
                        <Form.Control readOnly defaultValue={this.state.canton} />
                      </Form.Group>

                      <Form.Group as={Col} >
                        <Form.Label>Distrito</Form.Label>
                        <Form.Control readOnly defaultValue={this.state.distrito} />
                      </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Dirección exacta</Form.Label>
                      <Form.Control as="textarea" rows="3" readOnly defaultValue={this.state.direccion} />
                    </Form.Group>
                  </Form>
                  <br />
                  <Card>
                    <Card.Body className="mx-auto text-dark">
                      <Card.Title><h3>Expedientes judiciales asociados</h3></Card.Title>
                      <div className='card-text'>
                        <CasoList
                          casos={this.state.casos}
                          onViewDetail={this.showCasoHandler}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body className="mx-auto text-dark">
                      <Card.Title><h3>Informes policiales asociados</h3></Card.Title>
                      <div className='card-text'>
                        <InformeList
                          informes={this.state.informes}
                          viewDetail={this.showInformeHandler}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ) : (<p>No hay datos para esa persona...</p>)}
            </Card.Body>
          </Card>
        )}
      </React.Fragment>
    );
  }
}

export default FindPerson;
