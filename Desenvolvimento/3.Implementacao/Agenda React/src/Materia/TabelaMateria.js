function TabelaMateria({ vetor, remover, selecionarAtividade, selecionarAvisos }) {
    return (
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Matéria:</th>
                    <th scope="col">Sala:</th>
                    <th scope="col">Dia e Horário:</th>
                    <th scope="col" colSpan={4}>Funções:</th>
                </tr>
            </thead>
            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{obj.nome}</td>
                            <td>{obj.sala}</td>
                            <td>{obj.dia_horario}</td>
                            <td> <button className="btn btn-danger" onClick={() => remover(obj.id)}>Remover</button>  </td>
                            <td> <button className="btn btn-warning" onClick={() => { selecionarAtividade(indice) }}>Editar</button>  </td>
                            <td> <button className="btn btn-success" onClick={() => { selecionarAtividade(indice) }}>Atividades</button>  </td>
                            <td> <button className="btn btn-success" onClick={() => { selecionarAvisos(indice) }}>Avisos</button>  </td>
                        </tr>
                    ))

                }
            </tbody>
        </table>
    )
}
export default TabelaMateria;