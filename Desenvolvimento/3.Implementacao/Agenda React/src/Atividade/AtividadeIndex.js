import React from "react";
import { useEffect, useState } from 'react';
import TabelaAtividadeProf from './TabelaAtividadeProf'
import CadastroAtividade from './CadastrarAtividade';
import { serverAddress } from "../configServer";

function AtividadeIndex(materia) {
  const atividade = {
    id: 0,
    nome: '',
    data_entrega: '',
    descricao: '',
    materia: {},
    professor: '',
    feita: false
  };
  const [btnCadastrar, SetBtnCadastrar] = useState(true);
  const [selecionada, setSelecionada] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [objAtividade, setObjAtividade] = useState(atividade);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setObjAtividade(prevState => ({
      ...prevState,
      materia: { id: materia.materia }
    }));
    setPage(0);
  }, [materia.materia]);

  useEffect(() => {
    if (materia.materia) {
      fetch(serverAddress + `/listar-atividade/materia/${materia.materia}?page=${page}&size=${size}`)
        .then(response => response.json())
        .then(data => {
          setAtividades(data.content);
          setTotalPages(data.totalPages);
          setSelecionada(true);
        });
    }
  }, [materia, page, size]);

  const proximaPagina = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const paginaAnterior = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const aoDigitar = (e) => {
    setObjAtividade({ ...objAtividade, [e.target.name]: e.target.value });
  }

  const cadastrarAtividade = () => {
    console.log(objAtividade);

    fetch(serverAddress + '/cadastrar-atividade', {
      method: 'post',
      body: JSON.stringify(objAtividade),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
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

  const alterarAtividade = () => {
    fetch(serverAddress + '/editar-atividade', {
      method: 'put',
      body: JSON.stringify(objAtividade),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(atividadesRetorno => atividadesRetorno.json())
      .then(atividadesRetorno_convertido => {
        let vetorTemp = [...atividades];
        let indice = vetorTemp.findIndex((p) => {
          return p.id === objAtividade.id;
        });
        vetorTemp[indice] = objAtividade;

        setAtividades(vetorTemp);
        limparFormulario();
      }
      )
  }

  const removerAtividade = (id) => {
    fetch(serverAddress + '/remover-atividade/' + id, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(atividadesRetorno => atividadesRetorno.json())
      .then(atividadesRetorno_convertido => {
        let vetorTemp = [...atividades];
        let indice = vetorTemp.findIndex((p) => {
          return p.id === id;
        });
        vetorTemp.splice(indice, 1);

        setAtividades(vetorTemp);
        limparFormulario();
        alert(atividadesRetorno_convertido.mensagem);
      })
  }

  const limparFormulario = () => {
    setObjAtividade({
      ...atividade,
      materia: { id: materia.materia }
    });
    SetBtnCadastrar(true);
  };

  const selecionarAtividade = (indice) => {
    setObjAtividade(atividades[indice]);
    SetBtnCadastrar(false);
    console.log(atividades)
  }

  return (
    <div className="App">
      <h1>Atividades</h1>
      {
        selecionada &&
        <div className="cadastro-atividade">
          <CadastroAtividade obj={objAtividade} eventoTeclado={aoDigitar} cadastrar={cadastrarAtividade} alterar={alterarAtividade} botao={btnCadastrar} />
        </div>
      }
      <TabelaAtividadeProf vetor={atividades} remover={removerAtividade} selecionar={selecionarAtividade} />
      <div className="pagination">
        <button onClick={paginaAnterior} disabled={page === 0}>Anterior</button>
        <span>Página {page + 1} de {totalPages}</span>
        <button onClick={proximaPagina} disabled={page >= totalPages - 1}>Próxima</button>
      </div>
    </div>
  );
}

export default AtividadeIndex;