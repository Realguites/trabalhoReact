import React from "react";

const LineDetail = (props) => {
  return (
    <tr key={props.id} data-id={props.id} onClick={props.handleClick} >
      <td>{props.nome}</td>
      <td>{props.divisao}</td>
      <td>{props.estadio}</td>
      <td>{props.divida}</td>
      <td>
        <i className="far fa-edit text-success mr-2" title="Alterar"></i>
        <i className="fas fa-minus-circle text-danger" title="Excluir"></i>
      </td>
    </tr>
  );
};

export default LineDetail;
