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
        const Id = resData.data.numInforme._id
        const nInforme = resData.data.numInforme.nInforme;
        const f_informe = resData.data.numInforme.f_informe;
        const aprehendido = resData.data.numInforme.aprehendido;
        const casoCLAIS = resData.data.numInforme.casoCLAIS;
        const decA_Blanca = resData.data.numInforme.decA_Blanca;
        const decA_Fuego = resData.data.numInforme.decA_Fuego;
        const trasladoFiscalia = resData.data.numInforme.trasladoFiscalia;
        const primerizo = resData.data.numInforme.primerizo;
        const casoPorDesovediencia = resData.data.numInforme.casoPorDesovediencia;
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
            buscarInforme: false,
            modificarInforme: true,
            Resultado: false,
            sinResultados: false
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
    const nInforme = this.state.nInforme;
    const f_informe = this.f_informeEl.current.value;
    const aprehendido = this.state.aprehendidoCh;
    const casoCLAIS = this.state.casoCLAISCh;
    const decA_Blanca = this.state.decA_BlancaCh;
    const decA_Fuego = this.state.decA_FuegoCh;
    const trasladoFiscalia = this.state.trasladoFiscaliaCh;
    const primerizo = this.state.primerizoCh;
    const casoPorDesovediencia = this.state.casoPorDesovedienciaCh;

    if (nInforme.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
          mutation EditarInforme($nInforme: String!, $f_informe: String!, $aprehendido: Boolean!, $casoCLAIS: Boolean!, $decA_Blanca: Boolean!, $decA_Fuego: Boolean!, $trasladoFiscalia: Boolean!, $primerizo: Boolean!, $casoPorDesovediencia: Boolean!){
            editarInforme(nInforme: $nInforme, f_informe: $f_informe, aprehendido: $aprehendido, casoCLAIS: $casoCLAIS, decA_Blanca: $decA_Blanca, decA_Fuego: $decA_Fuego, trasladoFiscalia: $trasladoFiscalia, primerizo: $primerizo, casoPorDesovediencia: $casoPorDesovediencia){
              nInforme
            }
          }
        `,

      variables: {
        nInforme: nInforme,
        f_informe: f_informe,
        aprehendido: aprehendido,
        casoCLAIS: casoCLAIS,
        decA_Blanca: decA_Blanca,
        decA_Fuego: decA_Fuego,
        trasladoFiscalia: trasladoFiscalia,
        primerizo: primerizo,
        casoPorDesovediencia: casoPorDesovediencia
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
        const nInforme = resData.data.editarInforme.nInforme;
        if (resData === null) {
          this.setState({
            buscarInforme: false,
            modificarInforme: false,
            Resultado: false,
            sinResultados: true
          });
        }
        if (this.isActive) {
          this.setState({
            nInforme: nInforme,
            buscarInforme: false,
            modificarInforme: false,
            Resultado: true,
            sinResultados: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          nInforme: nInforme,
          buscarInforme: false,
          modificarInforme: false,
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
        {this.state.buscarInforme && (
          <div className="container">
            <div className="findMain1Div">
              <form className="findForm" onSubmit={this.findInformeHandler}>
                <span className="findFormSpan">
                  Informe:
                  </span>
                <input type="text" className="findFormInput" autoFocus={true} ref={this.nInformeEl} />
                <button className="findFormSubmit" type="submit" onClick={this.findInformeHandler}>
                  Buscar
              </button>
              </form>
            </div>
          </div>
        )}

        {this.state.modificarInforme && (
          <div className="container">
            <form className="newCasoForm" onSubmit={this.UpdateInformeHandler}>
              <legend className="newCasoFormLegend">Actualizar informe policial {this.state.nInforme}</legend>
              <div className="newCasoFormGroup">
                <span className="newCasoFormLabel">Fecha de informe</span>
                <input className="newCasoFormInput" type="text" defaultValue={this.state.f_informe} ref={this.f_informeEl} />
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.aprehendidoCh} onChange={this.cambioAprehendido} className="newCasoFormCheck" type="checkbox" label="Imputado aprehendido" />
                <span className="newCasoFormSpan">Imputado aprehendido</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.casoCLAISCh} onChange={this.cambioCasoCLAIS} className="newCasoFormCheck" type="checkbox" label="es caso CLAIS" />
                <span className="newCasoFormSpan">es caso CLAIS</span>
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
                <input checked={this.state.trasladoFiscaliaCh} onChange={this.cambioTrasladoFiscalia} className="newCasoFormCheck" type="checkbox" label="Aprehendido trasladado a fiscalía" />
                <span className="newCasoFormSpan">Aprehendido trasladado a fiscalía</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.primerizoCh} onChange={this.cambioPrimerizo} className="newCasoFormCheck" type="checkbox" label="Aprehendido es primerizo" />
                <span className="newCasoFormSpan">Aprehendido es primerizo</span>
              </div>
              <div className="newCasoFormGroup">
                <input checked={this.state.casoPorDesovedienciaCh} onChange={this.cambioCasoPorDesovediencia} className="newCasoFormCheck" type="checkbox" label="Es caso por desobediencia" />
                <span className="newCasoFormSpan">Es caso por desobediencia</span>
              </div>
              <button className="newCasoFormSubmit" type="submit">Actualizar</button>
            </form>
          </div>
        )}

        {this.state.sinResultados && (
          <div className="container">
            <div className="findMain1Div">
              <p className="newCasoFormP">No se encuentran registros asociados a ese número de Informe</p>
              <button className="newCasoFormFindNew" onClick={this.EditarNuevoInforme}>Buscar nuevamente</button>
            </div>
          </div>
        )}

        {this.state.Resultado && (
          <div className="container">
            <div className="findMain1Div">
              <p className="newCasoFormP">El informe {this.state.nInforme}, ha sido actualizado...</p>
              <button className="newCasoFormFindNew" onClick={this.EditarNuevoInforme}>Actualizar Otro</button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  };
}
export default UpdateInformePage;