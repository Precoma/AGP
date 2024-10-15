package br.com.api.agenda.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.agenda.model.AlunoAtividade;
import br.com.api.agenda.model.Atividade;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.model.Customer;
import br.com.api.agenda.repository.AlunoAtividadeRepository;
import br.com.api.agenda.repository.AtividadeRepository;
import br.com.api.agenda.repository.CustomerRepository;


@Service
public class AtividadeService {

    @Autowired
    private AtividadeRepository ar;

    @Autowired
    private CustomerRepository alunoRepository;

    @Autowired
    private AlunoAtividadeRepository alunoAtividadeRepository;

    @Autowired
    private RespostaModelo rm;

    // Listar
    public Iterable<Atividade> listar(){
        return ar.findAll();
    }

    // Cadastrar / Alterar
    public ResponseEntity<?> CadastrarAlterarAtividade(Atividade am, String acao){
        if(acao.equals("cadastrar")){

            Atividade novaAtividade = ar.save(am);

            // Busca todos os alunos
           List<Customer> alunos = alunoRepository.findAll();

            // Para cada aluno, cria uma entrada na tabela AlunoAtividade
            for (Customer aluno : alunos) {
                AlunoAtividade alunoAtividade = new AlunoAtividade();
                alunoAtividade.setAluno(aluno);
                alunoAtividade.setAtividade(novaAtividade);
                alunoAtividade.setStatusFeito(false); // Status inicial como não feito
                alunoAtividadeRepository.save(alunoAtividade); // Salva a entrada no banco de dados
            }

            return new ResponseEntity<Atividade>(novaAtividade, HttpStatus.CREATED);

        } else {
            return new ResponseEntity<Atividade>(ar.save(am), HttpStatus.OK);
        }
    }

    // Remover
    public ResponseEntity<RespostaModelo> remover(long id){

        ar.deleteById(id);

        rm.setMensagem("Atividade removida com sucesso");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
    
}
