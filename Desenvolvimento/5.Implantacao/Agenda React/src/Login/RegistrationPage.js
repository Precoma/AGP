import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function RegistrationPage() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  //const [dob, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isProfessor, setisProfessor] = useState(false);

  const handleRegistration = async () => {
    try {
      const userData = {
        firstname,
        lastname,
        email,
        //dob,
        password,
        isProfessor,
      };
      console.log(userData); // Verificar os dados antes de enviar

try {
  const response = await axios.post('http://localhost:8080/add', userData);
  console.log(response.data); // Verificar a resposta do servidor
  console.log('User registered:', response.data);

} catch (error) {
  console.error('Erro ao fazer a requisição:', error.response ? error.response.data : error.message);
  }

    } catch (error) {
      console.error('Registration error:', error);
    }
    setRegistrationSuccess(true);
  };

  if (registrationSuccess) {
    return (
    <div className='centered-container'>
      <div className="login-container">
      <h1>Conta criada com sucesso!</h1>
      <h2> </h2>
      <div className="registration-link">
        <p>Para acessar sua nova conta <a href="/">Faça Login </a></p>
      </div>
      </div>

    </div>);
  }
//<input type="date" placeholder="Data de nascimento" value={dob} onChange={(e) => setBirthDate(e.target.value)} /> 
     
  return (
    <div className="centered-container">
    <div className="login-container">
      <h2>Cadastro</h2>
      <div className="input-container">
        <input type="text" placeholder="Nome" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="input-container">
        <input type="text" placeholder="Sobrenome" value={lastname} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="input-container">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-container">
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

         <div className="input-container">
          É professor?
           <input type="checkbox" checked={isProfessor} onChange={(e) => setisProfessor(e.target.checked)}/>
        
        </div>
      <button className="login-button" onClick={handleRegistration}>Registrar</button>
      <div className="login-link">
        <p className='registration-link'>Já possui uma conta? <a href="/login">Faça Login</a></p>
      </div>
    </div>
    </div>
  );
}

export default RegistrationPage;

