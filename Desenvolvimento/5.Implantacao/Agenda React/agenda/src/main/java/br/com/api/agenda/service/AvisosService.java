package br.com.api.agenda.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.agenda.model.AlunoAviso;
import br.com.api.agenda.model.Avisos;
import br.com.api.agenda.model.Customer;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.repository.AlunoAvisoRepository;
import br.com.api.agenda.repository.AvisosRepository;
import br.com.api.agenda.repository.CustomerRepository;

@Service
public class AvisosService {

    @Autowired
    private AvisosRepository ar;

    @Autowired
    private RespostaModelo rm;

    @Autowired
    private CustomerRepository alunoRepository;

    @Autowired
    private AlunoAvisoRepository aar;


     public ResponseEntity<?> CadastrarAlterarAviso(Avisos avisoModel, String acao){
        if(acao.equals("cadastrar")){

            Avisos novoAviso = ar.save(avisoModel);

           List<Customer> alunos = alunoRepository.findAll();

            for (Customer aluno : alunos) {
                AlunoAviso alunoaviso = new AlunoAviso();
                alunoaviso.setAluno(aluno);
                alunoaviso.setAviso(novoAviso);
                aar.save(alunoaviso); 
            }

            return new ResponseEntity<Avisos>(novoAviso, HttpStatus.CREATED);

        } else {
            return new ResponseEntity<Avisos>(ar.save(avisoModel), HttpStatus.OK);
        }
    }


    public Iterable<Avisos> listar(){
    return ar.findAll();
    }

    // Remover
    public ResponseEntity<RespostaModelo> remover(long id){

        ar.deleteById(id);
    
        rm.setMensagem("Aviso removida com sucesso");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
    
}
