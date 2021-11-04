import React, { useState, useEffect, useRef } from 'react'
import FormClube from './FormClubes';
import LineDetail from './LineDetail';
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';
import SideLiga from './SideLiga';
import "./table.css";
import { db } from './Conectadb';
import { collection, getDocs } from 'firebase/firestore/lite';

const AppBody = () => {
  
  const [lista, setLista] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const childRef = useRef();

  // "efeito colateral", ocorre quando a página é carregada
  useEffect(async() => {
    //let clubes = localStorage.getItem("clubes") ? JSON.parse(localStorage.getItem("clubes")): [];
    //let clubes = getClubes(db) ? JSON.parse(getClubes(db)): [];
    let clubes = await getClubes(db)
    atualizaLista(clubes)
  }, []); 

  const setSearch = (palavra) => {
    setPesquisa(palavra)
    console.log(palavra +" - " + palavra.length)
    //let clubes = localStorage.getItem("clubes") ? JSON.parse(localStorage.getItem("clubes")): [];
    let clubes = lista;
      if(pesquisa.length > 1){
        clubes = clubes.filter((clube) => clube.nome.toLowerCase().includes(pesquisa.toLowerCase()))
        setLista(clubes)
        if(clubes.length === 0){
          NotificationManager.error('Por favor, verifique sua pesquisa!', 'Clube não encontrado!', 3000);
        }
      }else{
        clubes = lista;
        setLista(clubes);
        //clubes = localStorage.getItem("clubes") ? JSON.parse(localStorage.getItem("clubes")): [];
        //setLista(clubes);
      }
  }

  async function getClubes(db) {
    const clubesCol = collection(db, 'clubes');
    const clubesSnapshot = await getDocs(clubesCol);
    const clubesList = clubesSnapshot.docs.map(doc => doc.data());
    return clubesList;
  }

  //clubes.filter((clube) => clube.nome.includes(pesquisa));
  
  const handleClick = e => {
    // obtém a linha da tabela sobre a qual o usuário clicou, ou seja, qual elemento tr foi clicado
    const tr = e.target.closest("tr");

    // console.log(e.target);
    // console.log(tr);
    // console.log(tr.getAttribute("data-id"));  
    
    const id = Number(tr.getAttribute("data-id"));
    
    if (e.target.classList.contains("fa-edit")) {      
      const clubeAlt = {}
      let clubes = JSON.parse(localStorage.getItem("clubes"));
      for(let i = 0; i< clubes.length; i++){
        if(clubes[i]['id'] === id){
          
          clubeAlt.nome = clubes[i]['nome'];
          clubeAlt.divisao = clubes[i]['divisao'];
          clubeAlt.estadio = clubes[i]['estadio'];
          clubeAlt.divida = clubes[i]['divida'];
          clubeAlt.id = id;
        }
      }
      //console.log(clubes.length)
      // atribui a cada variável do form, o conteúdo da linha clicada
      

      // executa o método onLoadData do componente filho
      childRef.current.onLoadData(clubeAlt);

    } else if (e.target.classList.contains("fa-minus-circle")) {
      // console.log("Excluir");

      // obtém o nome da linha sobre a qual o usuário clicou
      const nome = tr.cells[0].innerText;

      if (window.confirm(`Confirma a exclusão do clube "${nome}"?`)) {
        // aplica um filtro para recuperar todas as linhas, exceto aquela que será excluída
        const novaLista = lista.filter((clube) => {return clube.id !== id});

        // atualiza o localStorage
        localStorage.setItem("clubes", JSON.stringify(novaLista));

        // atualiza a tabela (refresh)
        setLista(novaLista);
      }
    }
  }



  const atualizaLista = (dados) => {
    setLista(dados);
  }

  return (
    <div className="row">
      <SideLiga />

      <div className="col-sm-9 mt-2">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Pesquisa:</span>
        </div>
        <input
          type="text"
          className="form-control"
          value={pesquisa}
          onChange={(ev) =>setSearch(ev.target.value)}
          autoFocus
        />
        
        
        
        </div>
        <FormClube atualiza={atualizaLista} lista={lista} ref={childRef}/>

        <table className="table table-striped">
          
        
          <thead>
            <tr>
              <th>Nome</th>
              <th>Divisão</th>
              <th>Estádio</th>
              <th>Dívida</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((clube) => {
              clube.handleClick = handleClick;
              return (LineDetail(clube));
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppBody;