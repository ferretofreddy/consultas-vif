import React from 'react';
import { Button } from 'react-bootstrap';


import './InformeItem.css';

const informeItem = props => (
  <tr key={props.informeId}>
    <td>{props.nInforme}</td>
    <td>{new Date(props.f_informe).toLocaleDateString()}</td>
    <td>{props.imputadoNombre}</td>
    <td>{props.ofendidoNombre}</td>
    <td>
      <Button variant="outline-primary" onClick={props.detail.bind(this, props.informeId)}>
        Ver Informe
      </Button>
    </td>
  </tr>
);

export default informeItem;