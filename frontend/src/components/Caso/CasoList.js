import React from 'react';
import { Table } from 'react-bootstrap';

import CasoItem from './CasoItem';
import './CasoList.css';

const casoList = props => {
  const casos = props.casos.map(caso => {
    return (
      <CasoItem
        key={caso._id}
        casoId={caso._id}
        expediente={caso.expediente}
        juzgado={caso.juzgado}
        imputadoNombre={caso.imputado.nombre}
        ofendidoNombre={caso.ofendido.nombre}
        onDetail={props.onViewDetail}
      />
    );
    
  });

  return (
  <Table className="striped bordered hover bg-light col-md-12">
  <thead>
      <tr className="mx-auto">
        <th>Expediente N°</th>
        <th>Juzgado</th>
        <th>Nombre del agresor</th>
        <th>Nombre de la víctima</th>
        <th>Detalles</th>
      </tr>
    </thead>
    <tbody>{casos}</tbody>
  </Table>
  );
};

export default casoList;
