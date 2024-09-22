import { useEffect, useState } from 'react';
import './App.css';
import TabelaAtividade from './Atividade/TabelaAtividade';
import CadastroAtividade from './Atividade/CadastrarAtividade';

function App() {

    // Objeto Atividade
    const atividade = {
      id: 0,
      nome : '',
      data_entrega: '',
      descricao: '',
      feita: false
    }


    //UseState
    const[btnCadastrar, SetBtnCadastrar] = useState(true);
    const[atividades, setAtividades] = useState([]);
    const [objAtividade, setObjAtividade] = useState(atividade);


    useEffect(() => {
      fetch("http://localhost:8080/listar-atividade")
        .then(atividadesRetorno => atividadesRetorno.json())
        .then(atividadesRetorno_convertido => setAtividades(atividadesRetorno_convertido));
    }, []);


  //Obtendo os dados do formulario
  const aoDigitar = (e) => {
    setObjAtividade({...objAtividade, [e.target.name]:e.target.value});
  }

    // Cadastrar Atividade
    const cadastrarAtividade = () => {
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
              return p.id === objAtividade.id;
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
    }

  //Retorno
  return (
    <div className="App">
      <h1>Cadastrar Atividade</h1>
      <CadastroAtividade obj={objAtividade} eventoTeclado={aoDigitar} cadastrar={cadastrarAtividade} alterar={alterarAtividade} botao={btnCadastrar} />
      <TabelaAtividade vetor={atividades} remover={removerAtividade} selecionar={selecionarAtividade} />
    </div>
  );
}

export default App;
