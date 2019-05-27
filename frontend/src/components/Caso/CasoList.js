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
  <Table className="striped bordered">
  <thead>
      <tr>
        <th className=" ">Expediente N°</th>
        <th className=" ">Juzgado</th>
        <th className=" ">Nombre del agresor</th>
        <th className=" ">Nombre de la víctima</th>
        <th className=" ">Detalles</th>
      </tr>
    </thead>
    <tbody>{casos}</tbody>
  </Table>
  );
};

export default casoList;
