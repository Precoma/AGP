import React from "react";
import { useEffect, useState } from 'react';
import CadastrarAvisos from "./CadastrarAvisos";
import TabelaAvisos from "./TabelaAvisos";

function AvisosIndex(materia) {

    const aviso = {
        id: 0,
        aviso : '',
        materia: {}
    }

    //UseState
    const[btnCadastrar, SetBtnCadastrar] = useState(true);
    const[selecionada, SetSelecionada] = useState(false);
    const[avisos, setAvisos] = useState([]);

    const [objAvisos, setObjAvisos] = useState(aviso);

    useEffect(() => {
        setObjAvisos(prevState => ({
        ...prevState,
        materia: { id: materia.materia }
    }));
    }, [materia.materia]);

  useEffect(() => {
    fetch("http://localhost:8080/listar-avisos")
      .then(avisosRetorno => avisosRetorno.json())
      .then(avisosRetorno_convertido => {
        if (materia && materia.materia) {
          const avisosFiltradas = avisosRetorno_convertido.filter(aviso => aviso.materia.id === materia.materia);
          setAvisos(avisosFiltradas);
          SetSelecionada(true);
        } else {
            setAvisos(avisosRetorno_convertido);
        }
      });
  }, [materia]); // O useEffect será executado quando a matéria mudar

    //Obtendo os dados do formulario
    const aoDigitar = (e) => {
        setObjAvisos({...objAvisos, [e.target.name]:e.target.value});
    }
  
      // Cadastrar Avisos
      const cadastrarAvisos = () => {
        console.log(objAvisos);

        fetch('http://localhost:8080/cadastrar-aviso', {
          method:'post',
          body:JSON.stringify(objAvisos),
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
          }
        })
        .then(avisosRetorno => avisosRetorno.json())
        .then(avisosRetorno_convertido => {
            setAvisos([...avisos, avisosRetorno_convertido]);
            limparFormulario();
            alert('Aviso cadastrado com sucesso');            
          }
        )
      }
  
    // Alterar Avisos
    const alterarAvisos = () => {
      fetch('http://localhost:8080/editar-avisos', {
        method:'put',
        body:JSON.stringify(objAvisos),
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json'
        }
      })
      .then(avisosRetorno => avisosRetorno.json())
      .then(avisosRetorno_convertido => {
          //copia vetor atividades
          let vetorTemp = [...avisos];
  
          //indice
          let indice = vetorTemp.findIndex((p) =>{
            return p.id === objAvisos.id;
          });
  
          // alterar produto do vetortemp
          vetorTemp[indice] = objAvisos;
  
          //atualizar vetor produtos
          setAvisos(vetorTemp);
  
          //limpar form
          limparFormulario();
        }
      )
    }
  
    // Remover Atividade
    const removerAvisos = (id) => {
        fetch('http://localhost:8080/remover-avisos/'+id, {
            method:'delete',
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
              }
            })
            .then(avisosRetorno => avisosRetorno.json())
            .then(avisosRetorno_convertido => {
      
              //copia vetor produtos
              let vetorTemp = [...avisos];
      
              //indice
              let indice = vetorTemp.findIndex((p) =>{
                return p.id === id;
              });
      
              // Remover produto do vetortemp
              vetorTemp.splice(indice, 1);
      
              //atualizar vetor produtos
              setAvisos(vetorTemp);
      
              //Limpar formulario
              limparFormulario();
                     
              // Mensagem
              alert(avisosRetorno_convertido.mensagem);
            })
          }
  
  
    //Limpar Formulario
    const limparFormulario = () => {
      setObjAvisos(aviso);
      SetBtnCadastrar(true);
    }
  
      //Selecionar aviso
      const selecionarAviso = (indice) => {
        setObjAvisos(avisos[indice]);
        SetBtnCadastrar(false);
        console.log(avisos)
      }


    //Retorno
    return (
      <div className="App">
        <h1>Avisos</h1>
        {
            selecionada
            ?
            <div> <CadastrarAvisos obj={objAvisos} eventoTeclado={aoDigitar} cadastrar={cadastrarAvisos} alterar={alterarAvisos} botao={btnCadastrar} /> </div>
            :
            <div> </div>
        }
        <TabelaAvisos vetor={avisos} remover={removerAvisos} selecionar={selecionarAviso} />
      </div>
    );

}

export default AvisosIndex;