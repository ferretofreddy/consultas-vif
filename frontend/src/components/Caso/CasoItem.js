import React from 'react';
import { Button } from 'react-bootstrap';


import './CasoItem.css';

const casoItem = props => (
  <tr key={props.casoId}>
    <td>{props.expediente}</td>
    <td>{props.juzgado}</td>
    <td>{props.imputadoNombre}</td>
    <td>{props.ofendidoNombre}</td>
    <td>
      <Button variant="outline-primary" onClick={props.onDetail.bind(this, props.casoId)}>
        Ver Expediente
      </Button>
    </td>
  </tr>
);

export default casoItem;