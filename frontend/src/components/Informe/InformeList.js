import React from 'react';
import { Table } from 'react-bootstrap';

import InformeItem from './InformeItem';
import './InformeList.css';

const informeList = props => {
  const informes = props.informes.map(informe => {
    return (
      <InformeItem
        key={informe._id}
        informeId={informe._id}
        nInforme={informe.nInforme}
        f_informe={informe.f_informe}
        imputadoNombre={informe.imputado.nombre}
        ofendidoNombre={informe.ofendido.nombre}
        detail={props.viewDetail}
      />
    );
    
  });

  return (
  <Table className="bordered">
  <thead>
      <tr className="mx-auto">
        <th>Informe Policial N°</th>
        <th>Fecha del Informe</th>
        <th>Nombre del imputado</th>
        <th>Nombre del ofendido</th>
        <th>Detalles</th>
      </tr>
    </thead>
    <tbody>{informes}</tbody>
  </Table>
  );
};

export default informeList;