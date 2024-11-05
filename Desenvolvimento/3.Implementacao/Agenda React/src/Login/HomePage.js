import { useEffect, useState } from 'react';
import {FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './design/HomePage.css'; 
import TabelaAtividade from '../Atividade/TabelaAtividade';
import '../estilos/home.css';
import '../estilos/aluno.css';
import Navbar from './navbar.jsx';  

function HomePage({ user, onLogout }) {
    const navigate = useNavigate();

    const [filter, setFilter] = useState('pendentes'); // 'pendentes' ou 'feitas'

    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [atividades, setAtividades] = useState([]);
    const [objAtividade, setObjAtividade] = useState({
        id: 0,
        nome: '',
        data_entrega: '',
        descricao: '',
        materia: {},
        professor: '',
        feita: false
    });
    const [btnCadastrar, SetBtnCadastrar] = useState(true);

    const toggleUserMenu = () => {
        setUserMenuOpen(!isUserMenuOpen);
    };

    // Fetch para buscar atividades
    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const atividadesResponse = await fetch("http://localhost:8080/listar-atividade");
                const atividadesData = await atividadesResponse.json();

                // Aqui você pode buscar o status das atividades do aluno
                const alunoId = user.id; // Supondo que você tenha o id do aluno no objeto user
                const statusResponse = await fetch(`http://localhost:8080/alunos/${alunoId}/atividades`);
                const statusData = await statusResponse.json();

                console.log("statusData")
                console.log(statusData)

                // Mapear o status das atividades para as atividades
                const atividadesComStatus = atividadesData.filter(atividade => {
                    const statusAtividade = statusData.find(status => status.atividade.id === atividade.id);
                    return statusAtividade; // Filtrar apenas atividades vinculadas
                }).map(atividade => {
                    const statusAtividade = statusData.find(status => status.atividade.id === atividade.id);
                    return {
                        ...atividade,
                        feita: statusAtividade ? statusAtividade.statusFeito : false
                    };
                });

                setAtividades(atividadesComStatus);

                console.log("atividadesComStatus")
                console.log(atividadesComStatus)
            } catch (error) {
                console.error('Erro ao buscar atividades:', error);
            }
        };

        fetchAtividades();
    }, [user.id]); // O useEffect será executado quando o id do usuário mudar

    const removerAtividade = (id) => {
        fetch(`http://localhost:8080/alunos/${user.id}/atividades/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Atualizar o estado para remover a atividade da lista
                setAtividades(prevAtividades => prevAtividades.filter(atividade => atividade.id !== id));
                alert('Atividade removida com sucesso!');
            } else {
                alert('Erro ao remover atividade.');
            }
        })
        .catch(error => {
            console.error('Erro ao remover atividade:', error);
            alert('Erro ao remover atividade.');
        });
    };

    const selecionarAtividade = (indice) => {
        setObjAtividade(atividades[indice]);
        SetBtnCadastrar(false);
        console.log(atividades);
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login'); // Redireciona para a tela de login
    };

        // Função para filtrar as atividades com base no estado 'feita'
        const filtrarAtividades = () => {
            return atividades.filter(atividade => {
                if (filter === 'feitas') {
                    return atividade.feita;
                } else if (filter === 'pendentes') {
                    return !atividade.feita;
                } else {
                    return true; // Caso geral, mostrar todas
                }
            });
        };

    const atualizarAtividade = async (id, statusFeito) => {
        try {
            const response = await fetch(`http://localhost:8080/${user.id}/atividades/${id}/marcarFeita`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ statusFeito })
            });

            if (response.ok) {
                alert('Atividade atualizada com sucesso!');
                // Atualizar o estado local para refletir a mudança
                setAtividades(prevAtividades => prevAtividades.map(atividade => {
                    if (atividade.id === id) {
                        return { ...atividade, feita: statusFeito };
                    }
                    return atividade;
                }));
            } else {
                alert('Erro ao atualizar atividade');
            }
        } catch (error) {
            console.error('Erro ao atualizar atividade:', error);
        }
    };

    const desmarcarAtividade = async (id, statusFeito) => {
        try {
            const response = await fetch(`http://localhost:8080/${user.id}/atividades/${id}/desmarcarFeita`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ statusFeito })
            });

            if (response.ok) {
                alert('Atividade atualizada com sucesso!');
                // Atualizar o estado local para refletir a mudança
                setAtividades(prevAtividades => prevAtividades.map(atividade => {
                    if (atividade.id === id) {
                        return { ...atividade, feita: statusFeito };
                    }
                    return atividade;
                }));
            } else {
                alert('Erro ao atualizar atividade');
            }
        } catch (error) {
            console.error('Erro ao atualizar atividade:', error);
        }
    };

        // Função para redirecionar para a página de avisos
        const goToAvisos = () => {
            navigate('/avisos');
        };

    return (
        <div className="home-page">
            {/* <nav className="navbar">
                <span>Bem-vindo {user.firstname}!</span>
                <div className="nav-icons">
                    <FaUser className="user-icon" onClick={toggleUserMenu} />
                    {isUserMenuOpen && (
                        <div className="custom-menu">
                            <ul>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav> */}
            <Navbar
                user= {user.firstname}
                toggle= {toggleUserMenu}
                iumo= {isUserMenuOpen}
                handle= {handleLogout}
            />
            <header>
                <h1>Atividades</h1>
            </header>

            <button onClick={goToAvisos}>Ir para Avisos</button>

            {/* Radio buttons para selecionar o filtro */}
            <div className="filtro-atividades">
                <label>
                    <input
                        type="radio"
                        value="pendentes"
                        checked={filter === 'pendentes'}
                        onChange={() => setFilter('pendentes')}
                    />
                    Pendentes
                </label>
                <label>
                    <input
                        type="radio"
                        value="feitas"
                        checked={filter === 'feitas'}
                        onChange={() => setFilter('feitas')}
                    />
                    Feitas
                </label>
                <label>
                    <input
                        type="radio"
                        value="todas"
                        checked={filter === 'todas'}
                        onChange={() => setFilter('todas')}
                    />
                    Todas
                </label>
            </div>

            {/* Renderizar tabela de atividades filtrada */}
            <TabelaAtividade
                vetor={filtrarAtividades()} 
                remover={removerAtividade}
                selecionar={selecionarAtividade}
                atualizarAtividade={atualizarAtividade}
                desmarcarAtividade={desmarcarAtividade}
            />
        </div>
    );
}

export default HomePage;
