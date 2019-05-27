import React from 'react';
import { Button } from 'react-bootstrap';


import './CasoItem.css';

const casoItem = props => (
  <tr key={props.casoId}>
    <td className=" ">{props.expediente}</td>
    <td className=" ">{props.juzgado}</td>
    <td className=" ">{props.imputadoNombre}</td>
    <td className=" ">{props.ofendidoNombre}</td>
    <td className=" ">
      <Button variant="outline-primary" onClick={props.onDetail.bind(this, props.casoId)}>
        Ver Expediente
      </Button>
    </td>
  </tr>
);

export default casoItem;