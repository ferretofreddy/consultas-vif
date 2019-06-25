import React from 'react';

import CasoItem from './CasoItem';
import './CasoList.css';

const casoList = props => {
  const casos = props.casos.map(caso => {
    return (
      <CasoItem
        key={caso._id}
        casoId={caso._id}
        expediente={caso.expediente}
        imputadoNombre={caso.imputado.nombre}
        ofendidoNombre={caso.ofendido.nombre}
        onDetail={props.onViewDetail}
      />
    );


  });
  return (
    <table className="findInformeTable">
      <thead className="findInformeTableHeader">
        <tr className="findInformeTableHeaderRow">
          <th className="findInformeTableHeaderRowC1">Expediente N°</th>
          <th className="findInformeTableHeaderRowC2">Nombre del agresor</th>
          <th className="findInformeTableHeaderRowC3">Nombre de la víctima</th>
        </tr>
      </thead>
      <tbody className="findInformeTableBody">{casos}</tbody>
    </table>
  );
};

export default casoList;
