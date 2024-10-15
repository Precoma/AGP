import React, { useEffect, useState } from "react";
import { FaUser, FaArrowLeft } from 'react-icons/fa'; // FaArrowLeft para a seta
import { useNavigate } from 'react-router-dom';
import '../Login/design/HomePage.css'; 

function TabelaAvisosAluno({ user, onLogout }) {
    const [avisos, setAvisos] = useState([]);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvisos = async () => {
            try {
                // Busca todos os avisos
                const avisosResponse = await fetch("http://localhost:8080/listar-avisos");
                const avisosData = await avisosResponse.json();

                // Buscar os avisos vinculados ao aluno logado
                const alunoId = user.id; // Supondo que você tenha o id do aluno no objeto user
                const avisosAlunoResponse = await fetch(`http://localhost:8080/alunos/${alunoId}/avisos`);
                const avisosAlunoData = await avisosAlunoResponse.json();

                console.log("avisosAlunoData:", avisosAlunoData);

                // Filtrar e mapear avisos do aluno
                const avisosFiltrados = avisosData.filter(aviso => {
                    const avisoAluno = avisosAlunoData.find(vinculo => vinculo.aviso.id === aviso.id);
                    return avisoAluno; // Filtra apenas os avisos vinculados ao aluno
                }).map(aviso => {
                    return {
                        ...aviso,
                    };
                });

                setAvisos(avisosFiltrados);

                console.log("avisosFiltrados:", avisosFiltrados);
            } catch (error) {
                console.error('Erro ao buscar avisos:', error);
            }
        };

        fetchAvisos();
    }, [user]); // O useEffect será executado ao montar o componente e quando o user mudar

     // Função para deletar um aviso apenas para o aluno logado
     const deletarAviso = async (avisoId) => {
        try {
            await fetch(`http://localhost:8080/aluno/${user.id}/aviso/${avisoId}`, {
                method: 'DELETE',
            });

            // Após deletar, atualizar a lista de avisos sem o aviso deletado
            setAvisos(prevAvisos => prevAvisos.filter(aviso => aviso.id !== avisoId));
        } catch (error) {
            console.error('Erro ao deletar aviso:', error);
        }
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login'); // Redireciona para a tela de login
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!isUserMenuOpen);
    };

    // Função para redirecionar de volta para a HomeAluno
    const voltarParaHome = () => {
        navigate('/homeAluno');
    };

    return (
        <div className="home-page">
            <nav className="navbar">
                <div className="nav-icons">
                    <FaArrowLeft className="back-arrow" onClick={voltarParaHome} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <FaUser className="user-icon" onClick={toggleUserMenu} />
                    {isUserMenuOpen && (
                        <div className="custom-menu">
                            <ul>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <table className="table table-hover table-responsive w-auto table-striped">
                <thead>
                    <tr>
                        <th scope="col">Aviso:</th>
                        <th scope="col">Matéria:</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {avisos.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{obj.aviso}</td>
                            <td>{obj.materia.nome}</td>
                            <td> <button className="btn btn-danger" onClick={() => deletarAviso(obj.id)}>Remover</button>  </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaAvisosAluno;
