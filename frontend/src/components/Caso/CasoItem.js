import React from 'react';

import './CasoItem.css';

const casoItem = props => (
  <tr className="findInformeTableBodyRow" key={props.casoId} onClick={props.onDetail.bind(this, props.casoId)}>
    <td className="findInformeTableBodyRowC1">{props.expediente}</td>
    <td className="findInformeTableBodyRowC2">{props.imputadoNombre}</td>
    <td className="findInformeTableBodyRowC3">{props.ofendidoNombre}</td>
  </tr>
);

export default casoItem;