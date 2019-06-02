import React, { Component } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';

import MainNavigation from '../components/Navigation/MainNavigation';
import AuthContext from '../context/auth-context';
import server from '../components/Variable/Variable';

import './CreateCaso.css';

class CreateCasoPage extends Component {
  state = {
    server: server.server,
    NewCaso: true,
    FindImputado: false,
    CreateImputado: false,
    FindOfendido: false,
    CreateOfendido: false,
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
        if (this.state.FindImputado) {
          const personaId = resData.data.buscarPersona._id;
          const personaIdentificacion = resData.data.buscarPersona.identificacion;

          if (resData === null) {
            this.setState({ imputadoId: null, imputadoIdentificacion: null });
          }
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
          const personaId = resData.data.buscarPersona._id;
          const personaIdentificacion = resData.data.buscarPersona.identificacion;

          if (resData === null) {
            this.setState({ ofendidoId: null, ofendidoIdentificacion: null });
          }
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
    this.setState({ CreateImputado: true });
    /* crearPersonaHandler(); */
  };

  crearOfendido = event => {
    event.preventDefault();
    this.setState({ CreateOfendido: true });
    /* crearPersonaHandler(); */
  };

  crearPersonaHandler = event => {
    event.preventDefault();
    const nombre = this.nombreEl.current.value;
    const PersonaIdentificacion = this.PersonaIdentificacionEl.current.value;
    const f_nacimiento = this.f_nacimientoEl.current.value;
    const sexo = this.sexoEl.current.value;
    const edad = this.edadEl.current.value;
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
              imputadoId: personaId, imputadoIdentificacion: personaIdentificacion
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
              ofendidoId: personaId, ofendidoIdentificacion: personaIdentificacion
            });
          }
        };
      })
      .catch(err => {
        console.log(err);
        this.setState({ listar: false });
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  };

  render() {
    return (
      <React.Fragment>
        <MainNavigation />
        {this.state.NewCaso && (
          <Card className="col-lg-10 text-white bg-dark mx-auto mt-5 pb-3">
            <Form onSubmit={this.crearCasoHandler}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Expediente</Form.Label>
                  <Form.Control as='input' id="expediente" type="text" ref={this.expedienteEl} />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Juzgado</Form.Label>
                  <Form.Control as='input' id="juzgado" type="text" ref={this.juzgadoEl} />
                </Form.Group>

                <Form.Group className="mt-4 pb-3" as={Col}>
                  <Form.Check className="ml-2" type="checkbox" label="Desalojo del imputado" ref={this.desalojoEl} />
                  <Form.Check className="ml-2" type="checkbox" label="Cambio de domicilio de víctima" ref={this.cambioDomicilioVictEl} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Check className="ml-2 pb-2" type="checkbox" label="Notificación del imputado" ref={this.notifImputadoEl} />
                  <Form.Label className="ml-2">Fecha de notificación del imputado</Form.Label>
                  <Form.Control as='input' id="f_notifImputado" type="date" ref={this.f_notifImputadoEl} />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Check className="ml-2 pb-2" type="checkbox" label="Notificación del ofendido" ref={this.notifOfendidoEl} />
                  <Form.Label className="ml-2">Fecha de notificación del ofendido</Form.Label>
                  <Form.Control as='input' id="f_notifOfendido" type="date" ref={this.f_notifOfendidoEl} />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Check className="ml-2 pb-2" type="checkbox" label="Medidas de protección" ref={this.medidasProteccionEl} />
                  <Form.Label className="ml-2">Fecha de emisión de las medidas</Form.Label>
                  <Form.Control as='input' id="f_emisionMedidas" type="date" ref={this.f_emisionMedidasEl} />
                </Form.Group>
              </Form.Row>

              <Form.Row className="mb-4">
                {this.state.imputadoId ?
                  (
                    <Form.Group as={Row}>
                      <Form.Label className="ml-2 text-center" column sm={6}>
                        Identificacion del imputado:
                      </Form.Label>
                      <Col sm={5}>
                        <Form.Control className="text-white bg-dark text-center" defaultValue={this.state.imputadoIdentificacion} />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Button className="ml-2 mr-2" as={Col} variant="info" type="button" onClick={this.buscarImputado}>
                      Cargar Imputado
                    </Button>
                  )
                }

                {this.state.ofendidoId ?
                  (
                    <Form.Group as={Row}>
                      <Form.Label className="ml-2 text-center" column sm={6}>
                        Identificacion del ofendido:
                      </Form.Label>
                      <Col sm={5}>
                        <Form.Control className="text-white bg-dark text-center" defaultValue={this.state.ofendidoIdentificacion} />
                      </Col>
                    </Form.Group>
                  ) : (
                    <Button className="ml-2 mr-2" as={Col} variant="info" type="button" onClick={this.buscarOfendido}>
                  Cargar Ofendido
                </Button>
                  )
                }
              </Form.Row>

              <Button className="ml-2 mr-2" variant="primary" type="submit">
                Guardar
                </Button>
            </Form>
          </Card>
        )}

        {this.state.FindImputado && (
          <Card>
            <Form className="mx-auto" inline onSubmit={this.buscarPersonaHandler}>
              <Form.Label className="col-lg-5 mx-auto"> <h4>Ingrese identificación del imputado: </h4> </Form.Label><hr></hr>
              <Form.Control as='input' id="identificacion" type="text" className="mr-sm-2 col-lg-4 mx-auto" ref={this.PersonaIdentificacionEl} />
              <Button className="col-lg-2 mx-auto" variant="outline-primary" type="submit">
                Buscar
            </Button>
            </Form>

          </Card>
        )}

        {this.state.FindOfendido && (
          <Card>
            <Form className="mx-auto" inline onSubmit={this.buscarPersonaHandler}>
              <Form.Label className="col-lg-5 mx-auto"> <h4>Ingrese identificación del ofendido: </h4> </Form.Label><hr></hr>
              <Form.Control as='input' id="identificacion" type="text" className="mr-sm-2 col-lg-4 mx-auto" ref={this.PersonaIdentificacionEl} />
              <Button className="col-lg-2 mx-auto" variant="outline-primary" type="submit">
                Buscar
            </Button>
            </Form>

          </Card>
        )}
      </React.Fragment>
    );
  }
}

export default CreateCasoPage;
