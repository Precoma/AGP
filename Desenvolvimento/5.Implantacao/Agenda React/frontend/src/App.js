import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';

import TabelaAtividade from './Atividade/TabelaAtividade';
import CadastroAtividade from './Atividade/CadastrarAtividade';

import LoginPage from './Login/LoginPage';
import HomePage from './Login/HomePage';
import RegistrationPage from './Login/RegistrationPage';
import HomeProfessor from './Login/HomeProfessor';


function App() {
  
 

    


    // estrutura pro login
    
    const [user, setUser] = useState('');
    
    const handleLogin = (userData) => {

      setUser(userData);
      
      /* navigate('/atividades'); // Redireciona para a página de atividades após o login 
      const navigate = useNavigate(); */


    };
    const handleLogout = () => {
      setUser('');
    };

    // Objeto Atividade
    const atividade = {
      id: 0,
      nome : '',
      data_entrega: '',
      descricao: '',
      materia:'',
      professor:'',
      feita: false
    }

    


    //UseState
    const[btnCadastrar, SetBtnCadastrar] = useState(true);
    const[atividades, setAtividades] = useState([]);
    const [objAtividade, setObjAtividade] = useState(atividade);


    useEffect(() => {
      fetch("http://localhost:9090/listar-atividade")
        .then(atividadesRetorno => atividadesRetorno.json())
        .then(atividadesRetorno_convertido => setAtividades(atividadesRetorno_convertido));
    }, []);


  //Obtendo os dados do formulario
  const aoDigitar = (e) => {
    setObjAtividade({...objAtividade, [e.target.name]:e.target.value});
  }

    // Cadastrar Atividade
    const cadastrarAtividade = () => {
      fetch('http://localhost:9090/cadastrar-atividade', {
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
    fetch('http://localhost:9090/editar-atividade', {
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
          fetch('http://localhost:9090/remover-atividade/'+id, {
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
    }

  //Retorno
  return (

    
    <Router>
      
      <div className="App">
        <Routes>
          <Route
            //define a url da pagina do login, se trocar o path, o "register" ainda aparece na url padrao do localhost
            
            path="/"
            element={
              !user ? (
              <LoginPage onLogin={handleLogin} />
              ) : (
              <HomePage user={user} onLogout={handleLogout} />
              )
            } 
            />

        
        <Route path="/HomeAluno" element={<HomePage user={user} onLogout={handleLogout} />} /> {/* Roteie para HomePage */}
        <Route path="/HomeProf" element={<HomeProfessor user={user} onLogout={handleLogout} />} />
     


          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />


          <Route path="/register" element={<RegistrationPage />} />

          <Route 
           path="/atividades" 
           element={
               user ? (
                
                 <> <CadastroAtividade obj={objAtividade} eventoTeclado={aoDigitar} cadastrar={cadastrarAtividade} alterar={alterarAtividade} botao={btnCadastrar} />
                    <TabelaAtividade vetor={atividades} remover={removerAtividade} selecionar={selecionarAtividade} />  </>
                /*  <AtividadesPage 
                     objAtividade={objAtividade}
                     aoDigitar={aoDigitar}
                     cadastrarAtividade={cadastrarAtividade}
                     alterarAtividade={alterarAtividade}
                     btnCadastrar={btnCadastrar}
                     atividades={atividades}
                     removerAtividade={removerAtividade}
                     selecionarAtividade={selecionarAtividade}
                   /> */
                ) : (  
            <LoginPage onLogin={handleLogin} />
                    )
           }  
          />
        </Routes>
        <div>
          
          {!user && (
            <AuthLink />
          )}
          
        </div>
      </div>

      

    </Router>
  );
}

function AuthLink() {
  const location = useLocation();
  if (location.pathname === '/') {
    return (
      <p className = "registration-link">
        Não possui uma conta? <Link to="/register">Clique aqui para se registrar</Link>
      </p>
    );
  }
  return null;
}


export default App;
