package br.com.api.agenda.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.agenda.model.Materia;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.repository.MateriaRepository;

@Service
public class MateriaService {

    @Autowired
    private MateriaRepository mr;

    @Autowired
    private RespostaModelo rm;

    //Listar
    public Iterable<Materia> listar(Long userId){
        return mr.findByProfessorId(userId);
    }

    // Cadastrar / Alterar
    public ResponseEntity<?> CadastrarAlterarMateria(Materia materiaModel, String acao){

        if(acao.equals("cadastrar")){
            if (mr.existsById(materiaModel.getId())) {
                return new ResponseEntity<>("Materia já existe", HttpStatus.CONFLICT);
            }
            
            return new ResponseEntity<Materia>(mr.save(materiaModel), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<Materia>(mr.save(materiaModel), HttpStatus.OK);
        }
    }

    // Remover
    public ResponseEntity<RespostaModelo> remover(long id){

        mr.deleteById(id);
    
        rm.setMensagem("Materia removida com sucesso");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
