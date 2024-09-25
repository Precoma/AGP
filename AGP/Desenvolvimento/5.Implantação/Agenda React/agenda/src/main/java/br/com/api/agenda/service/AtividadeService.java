package br.com.api.agenda.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.agenda.model.Atividade;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.repository.AtividadeRepository;

@Service
public class AtividadeService {

    @Autowired
    private AtividadeRepository ar;

    @Autowired
    private RespostaModelo rm;


    // Listar
    public Iterable<Atividade> listar(){
        return ar.findAll();
    }

    // Cadastrar / Alterar
    public ResponseEntity<?> CadastrarAlterarAtividade(Atividade am, String acao){

        if(acao.equals("cadastrar")){
            return new ResponseEntity<Atividade>(ar.save(am), HttpStatus.CREATED);
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
