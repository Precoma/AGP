function TabelaAtividade({ vetor, remover, selecionar, atualizarAtividade, desmarcarAtividade }) {
        
    const handleCheckboxChange = (id, event) => {
        const isChecked = event.target.checked;
        // Se estiver marcado, atualiza a atividade como feita, caso contrário, desmarca
        if (isChecked) {
            atualizarAtividade(id, true); // Marca como feita
        } else {
            desmarcarAtividade(id, false); // Marca como não feita
        }
    };

    return(

        <table class="table table-hover table-responsive w-auto table-striped">
        <thead>
            <tr>
                <th scope="col">Atividade:</th>
                <th scope="col">Data entrega:</th>
                <th scope="col">Descrição:</th>
                <th scope="col">Matéria:</th>
                <th scope="col">Feita:</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {
                vetor.map((obj, indice) => (
                    <tr key={indice}>
                        <td>{obj.nome}</td>
                        <td>{obj.data_entrega}</td>
                        <td>{obj.descricao}</td>
                        <td>{obj.materia.nome}</td>
                        <td>
                                <input
                                    type="checkbox"
                                    checked={obj.feita} // Supondo que `feita` seja um booleano
                                    onChange={(event) => handleCheckboxChange(obj.id, event)}
                                />
                            </td>
                       <td> <button className="btn btn-danger" onClick={() => remover(obj.id)}>Remover</button>  </td>
                    </tr>
                ))

            }
        </tbody>
    </table>

    )
}

export default TabelaAtividade;