import React from 'react';

import InformeItem from './InformeItem';
import './InformeList.css';

const informeList = props => {
  const informes = props.informes.map(informe => {
    return (
      <InformeItem
        key={informe._id}
        informeId={informe._id}
        nInforme={informe.nInforme}
        imputadoNombre={informe.imputado.nombre}
        ofendidoNombre={informe.ofendido.nombre}
        detail={props.viewDetail}
      />
    );

  });

  return (
    <table className="findInformeTable">
      <thead className="findInformeTableHeader">
        <tr className="findInformeTableHeaderRow">
          <th className="findInformeTableHeaderRowC1">Informe Policial N°</th>
          <th className="findInformeTableHeaderRowC2">Nombre del imputado</th>
          <th className="findInformeTableHeaderRowC3">Nombre del ofendido</th>
        </tr>
      </thead>
      <tbody className="findInformeTableBody">{informes}</tbody>
    </table>
  );
};

export default informeList;