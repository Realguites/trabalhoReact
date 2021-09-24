import React from "react";

const DivMessageErrors = ({ errors }, estadio_atual) => {
  return (
    <div
      className={
        (errors.nome || errors.divisao || errors.estadio || errors.cidade) &&
        "alert alert-danger"
      }
    >
      {errors.nome && (
        <span>nome deve ser preenchido (até 30 caracteres); </span>
      )}
      {errors.divisao && <span>divisao deve ser selecionada; </span>}
      {errors.estadio && (
        <span>
          estadio deve ser preenchido (entre {estadio_atual - 30} e {estadio_atual + 1}
          );
        </span>
      )}
      {errors.cidade && (
        <span>Preço deve ser preenchido (entre 5000 e 100000); </span>
      )}
    </div>
  );
};

export default DivMessageErrors;
