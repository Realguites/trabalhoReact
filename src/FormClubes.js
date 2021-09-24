import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { NotificationContainer } from 'react-notifications';
import DivMessageErrors from "./DivMessageErrors";
import NotificationsAlert from "./NotificationsAlert";

const FormClubes = forwardRef(({ atualiza, lista }, ref) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [alterar, setAlterar] = useState(false);
    const [data_id, setData_id] = useState(0);

    let clubes = localStorage.getItem("clubes") ?
        JSON.parse(localStorage.getItem("clubes")) :
        "";

    // salva os dados na inclusão

    const onSubmit = (data) => {

        // acrescenta um novo atributo aos dados enviados a partir do formulário
        data.id = new Date().getTime();
        console.log(data);

        // se houver dados salvos em localStorage, obtém esses dados (senão, vazio)


        // salva em localstorage os dados existentes, acrescentando o preenchido no form                    
        localStorage.setItem("clubes", JSON.stringify([...clubes, data]));

        // atualiza a lista
        // setLista([...lista, data]);
        atualiza([...lista, data]);

        // pode-se limpar cada campo
        setValue("nome", "");
        setValue("divisao", "");
        setValue("estadio", "");
        setValue("divida", "");

        // ou, então, limpar todo o form
        // contudo, esse reset() não limpa o conteúdo das variáveis (ou seja, se o usuário
        // clicar 2x sobre o adicionar, irá duplicar o registro)
        //    e.target.reset();
    }

    // salva os dados na alteração
    const onUpdate = data => {
        // inicialmente, recupera os dados salvos em localStorage
        const clubes = JSON.parse(localStorage.getItem("clubes"));

        // cria um novo array vazio
        const clubes2 = [];

        for (const clube of clubes) {
            if (clube.id === data_id) {
                data.id = data_id;
                clubes2.push(data); // os dados do form (alterados) + data.id
            } else {
                clubes2.push(clube);
            }
        }

        // atualiza os dados em localStorage (com os dados de clubes2)
        localStorage.setItem("clubes", JSON.stringify(clubes2));

        // atualiza a lista (para fazer um refresh na página)
        // setLista(clubes2);
        atualiza(clubes2);

        setValue("nome", "");
        setValue("divisao", "");
        setValue("estadio", "");
        setValue("divida", "");

        setAlterar(false);

        NotificationsAlert("success", "Atenção!", "Clube Alterado com Sucesso");
    }

    // faz a desestruturação do objeto recebido
    const onLoadData = ({ id, nome, divisao, estadio, divida }) => {
        setValue("nome", nome);
        setValue("divisao", divisao);
        setValue("estadio", estadio);
        setValue("divida", divida);

        setAlterar(true);
        setData_id(id);
    }

    useImperativeHandle(ref, () => ({
        onLoadData
    }));

    // obtém o estadio atual
    const estadio_atual = new Date().getFullYear();
    return (
     
        <form onSubmit={alterar ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
      
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Nome:</span>
        </div>
        <input
          type="text"
          className="form-control"
          {...register("nome", {
            required: true,
            minLength: 2,
            maxLength: 30,
          })}
          autoFocus
        />
        <div className="input-group-prepend">
          <span className="input-group-text">Divisão:</span>
        </div>
        <select
          className="form-control"
          {...register("divisao", {
            required: true,
          })}
        >
          <option value=""> Selecione a divisão </option>
          <option value="1">Primeira Divisão</option>
          <option value="2">Segunda Divisão</option>
          <option value="3">Terceira Divisão</option>
          <option value="4">Quarta Divisão</option>
        </select>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Estádio:</span>
        </div>
        <input
          type="text"
          className="form-control"
          {...register("estadio", {
            required: true,
            min: estadio_atual - 30,
            max: estadio_atual + 1,
          })}
        />
        <div className="input-group-prepend">
          <span className="input-group-text">Dívida:</span>
        </div>
        <input
          type="Number"
          className="form-control"
          {...register("divida", {
            required: true,
            min: 5000,
            max: 100000,
          })}
        />
        <div className="input-group-append">
          <input
            type="submit"
            className={alterar ? "d-none" : "btn btn-primary"}
            value="Adicionar"
          />
          <input
            type="submit"
            className={alterar ? "btn btn-success" : "d-none"}
            value="Alterar"
          />
        </div>
      </div>
      <DivMessageErrors errors={errors} estadio_atual={estadio_atual} />    
      <NotificationContainer/>
    </form>

  );
});
export default FormClubes;