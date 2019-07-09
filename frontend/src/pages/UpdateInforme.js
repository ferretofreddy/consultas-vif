import React, { Component } from 'react';

import Menu from '../components/Navigation/Menu';
import AuthContext from '../context/auth-context';
import server from '../components/Variable/Variable';
import './FindPerson.css';

class UpdateInformePage extends Component {
  // Estados
  state = {
    server: server.server,
    buscarInforme: true,
    modificarInforme: false,
    Resultado: false,
    sinResultados: false,
    Id: null,
    nInforme: null,
    f_informe: null,
    // checkBoxs del formulario
    aprehendidoCh: null,
    casoCLAISCh: null,
    decA_BlancaCh: null,
    decA_FuegoCh: null,
    trasladoFiscaliaCh: null,
    primerizoCh: null,
    casoPorDesovedienciaCh: null
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.nInformeEl = React.createRef();
    this.f_informeEl = React.createRef();
  };
  // modificar los estados de los chckbox
  cambioAprehendido = () => {
    this.setState({
      aprehendidoCh: !this.state.aprehendidoCh,
    });
    console.log(this.state.aprehendidoCh);
  };

  cambioCasoCLAIS = () => {
    this.setState({
      casoCLAISCh: !this.state.casoCLAISCh,
    });
  };

  cambioDecA_Blanca = () => {
    this.setState({
      decA_BlancaCh: !this.state.decA_BlancaCh,
    });
  };

  cambioDecA_Fuego = () => {
    this.setState({
      decA_FuegoCh: !this.state.decA_FuegoCh,
    });
  };

  cambioTrasladoFiscalia = () => {
    this.setState({
      trasladoFiscaliaCh: !this.state.trasladoFiscaliaCh,
    });
  };

  cambioPrimerizo = () => {
    this.setState({
      primerizoCh: !this.state.primerizoCh,
    });
  };

  cambioCasoPorDesovediencia = () => {
    this.setState({
      casoPorDesovedienciaCh: !this.state.casoPorDesovedienciaCh,
    });
  };

  EditarNuevoInforme = event => {
    event.preventDefault();
    this.setState({
      buscarInforme: true,
      modificarInforme: false,
      Resultado: false,
      sinResultados: false,
      Id: null,
      nInforme: null,
      f_informe: null,
      aprehendidoCh: null,
      casoCLAISCh: null,
      decA_BlancaCh: null,
      decA_FuegoCh: null,
      trasladoFiscaliaCh: null,
      primerizoCh: null,
      casoPorDesovedienciaCh: null
    });
  };
  // manejador de evento Buscar informe Query
  findInformeHandler = event => {
    event.preventDefault();
    const nInforme = this.nInformeEl.current.value;
    const requestBody = {
      query: `
          query numeroInforme($nInforme: String!){
            numInforme(nInforme: $nInforme){
              nInforme
              f_informe
              aprehendido
              casoCLAIS
              decA_Blanca
              decA_Fuego
              trasladoFiscalia
              primerizo
              casoPorDesovediencia
            }
          }
        `,

      variables: {
        nInforme: nInforme
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
            buscarInforme: false,
            modificarInforme: false,
            Resultado: false,
            sinResultados: true
          });
        }
        const nInforme
        const f_informe
        const aprehendido
        const casoCLAIS
        const decA_Blanca
        const decA_Fuego
        const trasladoFiscalia
        const primerizo
        const casoPorDesovediencia

        console.log(resData.data.numInforme.nInforme);

        if (this.isActive) {
          this.setState({
            Id: Id,
            nInforme: nInforme,
            f_informe: f_informe,
            aprehendidoCh: aprehendido,
            casoCLAISCh: casoCLAIS,
            decA_BlancaCh: decA_Blanca,
            decA_FuegoCh: decA_Fuego,
            trasladoFiscaliaCh: trasladoFiscalia,
            primerizoCh: primerizo,
            casoPorDesovedienciaCh: casoPorDesovediencia,
          });
        }
        console.log(this.state.nInforme);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          buscarInforme: false,
          modificarInforme: false,
          Resultado: false,
          sinResultados: true
        });
      });
  };
  // manejador de evento Actualizar informe Query
  UpdateInformeHandler = event => {
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
}
export default UpdateInformePage;