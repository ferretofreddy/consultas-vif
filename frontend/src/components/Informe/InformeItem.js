import React from 'react';

import './InformeItem.css';

const informeItem = props => (
  <tr className="findInformeTableBodyRow" key={props.informeId} onClick={props.detail.bind(this, props.informeId)}>
    <td className="findInformeTableBodyRowC1">{props.nInforme}</td>
    <td className="findInformeTableBodyRowC2">{props.imputadoNombre}</td>
    <td className="findInformeTableBodyRowC3">{props.ofendidoNombre}</td>
  </tr>
);

export default informeItem;