import React from "react";
import { useEffect, useState } from 'react';
import TabelaAtividadeProf from './TabelaAtividadeProf'
import CadastroAtividade from './CadastrarAtividade';
import '../estilos/atividade.css'

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
  const [page, setPage] = useState(0); // Página atual
  const [size, setSize] = useState(3); // Tamanho da página
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  useEffect(() => {
    setObjAtividade(prevState => ({
      ...prevState,
      materia: { id: materia.materia }
    }));
    setPage(0);
  }, [materia.materia]);

  // Fetch para buscar atividades da matéria selecionada com paginação
  useEffect(() => {
    if (materia.materia) {
      fetch(`http://localhost:8080/listar-atividade/materia/${materia.materia}?page=${page}&size=${size}`)
        .then(response => response.json())
        .then(data => {
          setAtividades(data.content);
          setTotalPages(data.totalPages);
          setSelecionada(true);
        });
    }
  }, [materia, page, size]); // O useEffect será executado quando a matéria ou a página mudar

  

  // Funções de navegação
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
      setObjAtividade({
        ...atividade,  // Restabelece os campos da atividade
        materia: { id: materia.materia }  // Mantém o ID da matéria
      });
      SetBtnCadastrar(true);
    };
  
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