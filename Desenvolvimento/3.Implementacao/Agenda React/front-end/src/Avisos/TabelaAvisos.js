function TabelaAvisos({ vetor, remover, selecionar}) {
    return(
        <table class="table table-hover table-responsive w-auto table-striped">
        <thead>
            <tr>
                <th scope="col">Aviso:</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {
                vetor.map((obj, indice) => (
                    <tr key={indice}>
                        <td>{obj.aviso}</td>
                        <td> <button className="btn btn-danger" onClick={() => remover(obj.id)}>Remover</button>  </td> 
                        <td> <button className="btn btn-warning" onClick={() => {selecionar(indice)}}>Editar</button>  </td>
                    </tr>
                ))

            }
        </tbody>
    </table>
    )
}
export default TabelaAvisos;