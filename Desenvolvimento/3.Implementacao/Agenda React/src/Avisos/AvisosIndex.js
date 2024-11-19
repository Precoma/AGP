import React from "react";
import { useEffect, useState } from 'react';
import CadastrarAvisos from "./CadastrarAvisos";
import TabelaAvisos from "./TabelaAvisos";
import { serverAddress } from "../configServer";

function AvisosIndex(materia) {
  const aviso = {
    id: 0,
    aviso: '',
    materia: {}
  }
  const [btnCadastrar, SetBtnCadastrar] = useState(true);
  const [selecionada, SetSelecionada] = useState(false);
  const [avisos, setAvisos] = useState([]);
  const [objAvisos, setObjAvisos] = useState(aviso);

  useEffect(() => {
    setObjAvisos(prevState => ({
      ...prevState,
      materia: { id: materia.materia }
    }));
  }, [materia.materia]);

  useEffect(() => {
    fetch(serverAddress + "/listar-avisos")
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
  }, [materia]);

  const aoDigitar = (e) => {
    setObjAvisos({ ...objAvisos, [e.target.name]: e.target.value });
  }

  const cadastrarAvisos = () => {
    console.log(objAvisos);

    fetch(serverAddress + '/cadastrar-aviso', {
      method: 'post',
      body: JSON.stringify(objAvisos),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
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

  const alterarAvisos = () => {
    fetch(serverAddress + '/editar-avisos', {
      method: 'put',
      body: JSON.stringify(objAvisos),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(avisosRetorno => avisosRetorno.json())
      .then(avisosRetorno_convertido => {
        let vetorTemp = [...avisos];
        let indice = vetorTemp.findIndex((p) => {
          return p.id === objAvisos.id;
        });
        vetorTemp[indice] = objAvisos;

        setAvisos(vetorTemp);
        limparFormulario();
      }
      )
  }

  const removerAvisos = (id) => {
    fetch(serverAddress + '/remover-avisos/' + id, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(avisosRetorno => avisosRetorno.json())
      .then(avisosRetorno_convertido => {
        let vetorTemp = [...avisos];
        let indice = vetorTemp.findIndex((p) => {
          return p.id === id;
        });
        vetorTemp.splice(indice, 1);

        setAvisos(vetorTemp);
        limparFormulario();
        alert(avisosRetorno_convertido.mensagem);
      })
  }

  const limparFormulario = () => {
    setObjAvisos(aviso);
    SetBtnCadastrar(true);
  }

  const selecionarAviso = (indice) => {
    setObjAvisos(avisos[indice]);
    SetBtnCadastrar(false);
    console.log(avisos)
  }

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