import React from "react";
import { useEffect, useState } from 'react';
import TabelaAtividadeProf from './TabelaAtividadeProf'
import CadastroAtividade from './CadastrarAtividade';

function AtividadeIndex(materia) {

     // Objeto Atividade
     const atividade = {
        id: 0,
        nome : '',
        data_entrega: '',
        descricao: '',
        materia: {},
        professor:'',
        feita: false
      }
  
  
      //UseState
      const[btnCadastrar, SetBtnCadastrar] = useState(true);
      const[selecionada, SetSelecionada] = useState(false);
      const[atividades, setAtividades] = useState([]);

      const [objAtividade, setObjAtividade] = useState(atividade);

      useEffect(() => {
        // Atualiza o objeto Atividade sempre que a matéria for alterada
        setObjAtividade(prevState => ({
            ...prevState,
            materia: { id: materia.materia }  // Atualizando o ID da matéria no objeto atividade
        }));
    }, [materia.materia]);  // Esse useEffect será disparado sempre que a prop 'materia' mudar

  
  
   // Fetch para buscar atividades
  useEffect(() => {
    fetch("http://localhost:8080/listar-atividade")
      .then(atividadesRetorno => atividadesRetorno.json())
      .then(atividadesRetorno_convertido => {
        // Se houver uma matéria selecionada, filtrar as atividades por id da matéria
        if (materia && materia.materia) {
          const atividadesFiltradas = atividadesRetorno_convertido.filter(atividade => atividade.materia.id === materia.materia);
          setAtividades(atividadesFiltradas);
          SetSelecionada(true);
        } else {
          setAtividades(atividadesRetorno_convertido); // Caso não haja matéria selecionada, exibir todas
        }
      });
  }, [materia]); // O useEffect será executado quando a matéria mudar

    //Obtendo os dados do formulario
    const aoDigitar = (e) => {
      setObjAtividade({...objAtividade, [e.target.name]:e.target.value});
    }
  
      // Cadastrar Atividade
      const cadastrarAtividade = () => {
        console.log(objAtividade);

        fetch('http://localhost:8080/cadastrar-atividade', {
          method:'post',
          body:JSON.stringify(objAtividade),
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
          }
        })
        .then(atividadesRetorno => atividadesRetorno.json())
        .then(atividadesRetorno_convertido => {
            setAtividades([...atividades, atividadesRetorno_convertido]);
            limparFormulario();
            alert('Atividade cadastrada com sucesso');            
          }
        )
      }
  
    // Alterar Atividade
    const alterarAtividade = () => {
      fetch('http://localhost:8080/editar-atividade', {
        method:'put',
        body:JSON.stringify(objAtividade),
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json'
        }
      })
      .then(atividadesRetorno => atividadesRetorno.json())
      .then(atividadesRetorno_convertido => {
          //copia vetor atividades
          let vetorTemp = [...atividades];
  
          //indice
          let indice = vetorTemp.findIndex((p) =>{
            return p.id === objAtividade.id;
          });
  
          // alterar produto do vetortemp
          vetorTemp[indice] = objAtividade;
  
          //atualizar vetor produtos
          setAtividades(vetorTemp);
  
          //limpar form
          limparFormulario();
        }
      )
    }
  
          // Remover Atividade
          const removerAtividade = (id) => {
            fetch('http://localhost:8080/remover-atividade/'+id, {
              method:'delete',
              headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
              }
            })
            .then(atividadesRetorno => atividadesRetorno.json())
            .then(atividadesRetorno_convertido => {
      
              //copia vetor produtos
              let vetorTemp = [...atividades];
      
              //indice
              let indice = vetorTemp.findIndex((p) =>{
                return p.id === id;
              });
      
              // Remover produto do vetortemp
              vetorTemp.splice(indice, 1);
      
              //atualizar vetor produtos
              setAtividades(vetorTemp);
      
              //Limpar formulario
              limparFormulario();
                     
              // Mensagem
              alert(atividadesRetorno_convertido.mensagem);
            })
          }
  
  
    //Limpar Formulario
    const limparFormulario = () => {
      setObjAtividade(atividade);
      SetBtnCadastrar(true);
    }
  
      //Selecionar Atividade
      const selecionarAtividade = (indice) => {
        setObjAtividade(atividades[indice]);
        SetBtnCadastrar(false);
        console.log(atividades)
      }


    //Retorno
    return (
      <div className="App">
        <h1>Atividades</h1>
        {
            selecionada
            ?
            <div> <CadastroAtividade obj={objAtividade} eventoTeclado={aoDigitar} cadastrar={cadastrarAtividade} alterar={alterarAtividade} botao={btnCadastrar} /> </div>
            :
            <div> </div>
        }
        <TabelaAtividadeProf vetor={atividades} remover={removerAtividade} selecionar={selecionarAtividade} />
      </div>
    );
}
  
  export default AtividadeIndex;