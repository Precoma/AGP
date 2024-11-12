import React from "react";
import { useEffect, useState } from 'react';
import CadastrarMateria from "./CadastrarMateria";
import TabelaMateria from "./TabelaMateria";
import AtividadeIndex from "../Atividade/AtividadeIndex";
import AvisosIndex from "../Avisos/AvisosIndex";

function MateriaIndex(user) {
    //Objeto Materia
    const materia = {
        id: 0,
        nome: '',
        sala: '',
        dia_horario: '',
        atividades: [],
        professor: user.user
    }

    // Objeto Atividade
    const atividade = {
        id: 0,
        nome: '',
        data_entrega: '',
        descricao: '',
        materia: '',
        professor: '',
        feita: false
    }

    //UseState
    const [btnCadastrar, SetBtnCadastrar] = useState(true);

    const [materiaSelecionadaAtividade, SetMateriaSelecionadaAtividade] = useState(false);
    const [materiaSelecionadaAvisos, SetMateriaSelecionadaAvisos] = useState(false);

    const [materias, setMaterias] = useState([]);
    const [atividades, setAtividades] = useState([]);

    const [objMateria, setObjMateria] = useState(materia);
    const [objAtividade, setObjAtividade] = useState(atividade);

    const [materiaId, setMateriaId] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        // Carrega matérias
        fetch(`http://localhost:8080/listar-materias?userId=${user.user.id}`)
            .then(materiasRetorno => materiasRetorno.json())
            .then(materiasRetorno_convertido => setMaterias(materiasRetorno_convertido));

        console.log(user.user.id)
    }, []);

    //Obtendo os dados do formulario
    const aoDigitar = (e) => {
        setObjMateria({ ...objMateria, [e.target.name]: e.target.value, professor_id: { id: user.user.id } });
    }

    //Cadastrar
    const cadastrarMateria = () => {
        fetch('http://localhost:8080/cadastrar-materia', {
            method: 'post',
            body: JSON.stringify(objMateria),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(materiasRetorno => materiasRetorno.json())
            .then(materiasRetorno_convertido => {
                setMaterias([...materias, materiasRetorno_convertido]);
                console.log(user.user.id)
                limparFormulario();
                alert('Materia cadastrada com sucesso!');
            }
            )
    }

    //Editar
    const alterarMateria = () => {
        fetch('http://localhost:8080/editar-materia', {
            method: 'put',
            body: JSON.stringify(objMateria),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(materiasRetorno => materiasRetorno.json())
            .then(materiasRetorno_convertido => {
                //Copia vetor
                let vetorTemp = [...materias];

                //Indice
                let indice = vetorTemp.findIndex((p) => {
                    return p.id === objMateria.id;
                });

                //Alterar produto do vetortemp
                vetorTemp[indice] = objMateria;

                //Atualizar vetor
                setMaterias(vetorTemp);

                //Limpar form
                limparFormulario();
            })
    }

    //Remover
    const removerMateria = (id) => {
        fetch('http://localhost:8080/remover-materia/' + id, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(materiasRetorno => materiasRetorno.json())
            .then(materiasRetorno_convertido => {

                //copia vetor
                let vetorTemp = [...materias];

                //indice
                let indice = vetorTemp.findIndex((p) => {
                    return p.id === id;
                });

                //Remover produto do vetortemp
                vetorTemp.splice(indice, 1);

                //atualizar vetor produtos
                setMaterias(vetorTemp);

                //Limpar formulario
                limparFormulario();

                // Mensagem
                alert(materiasRetorno_convertido.mensagem);
            })
    }

    //Limpar Formulario
    const limparFormulario = () => {
        setObjMateria(materia);
        SetBtnCadastrar(true);
        SetMateriaSelecionadaAtividade(false);
        SetMateriaSelecionadaAvisos(false);
    }

    useEffect(() => {
        if (materiaId !== null) {
            console.log("ID da Matéria Selecionada:", materiaId);

        }
    }, [materiaId]); // Monitorando alterações em materiaId

    //Selecionar
    const selecionarMateriaAtividade = (indice) => {

        limparFormulario();

        setObjMateria(materias[indice]);

        SetBtnCadastrar(false);
        SetMateriaSelecionadaAtividade(true);

        console.log("Matéria Selecionada:", materias[indice]);
        setMateriaId(materias[indice].id);
    }

    const selecionarMateriaAvisos = (indice) => {

        limparFormulario();

        setObjMateria(materias[indice]);

        SetBtnCadastrar(false);
        SetMateriaSelecionadaAvisos(true);

        console.log("Matéria Selecionada:", materias[indice]);
        setMateriaId(materias[indice].id);
    }

    return (
        <div className="App">
            <h1>Cadastrar Matéria</h1>
            <div className="cadastro-materia">
                <CadastrarMateria
                    obj={objMateria}
                    eventoTeclado={aoDigitar}
                    cadastrar={cadastrarMateria}
                    alterar={alterarMateria}
                    botao={btnCadastrar}
                    limparForm={limparFormulario}
                />
            </div>

            <div className="tabela-materias">
                <TabelaMateria
                    vetor={materias}
                    remover={removerMateria}
                    selecionarAtividade={selecionarMateriaAtividade}
                    selecionarAvisos={selecionarMateriaAvisos}
                />
            </div>

            <div className="atividades-index">
                {materiaSelecionadaAtividade ? (
                    <AtividadeIndex
                        materia={materiaId}
                        selecionada={materiaSelecionadaAtividade}
                    />
                ) : (
                    <div></div>
                )}
            </div>

            <div className="avisos-index">
                {materiaSelecionadaAvisos ? (
                    <AvisosIndex
                        materia={materiaId}
                        selecionada={materiaSelecionadaAvisos}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
export default MateriaIndex;