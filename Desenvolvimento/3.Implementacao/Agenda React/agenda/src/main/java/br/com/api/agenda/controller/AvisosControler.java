package br.com.api.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.agenda.model.AlunoAviso;
import br.com.api.agenda.model.Avisos;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.service.AlunoAvisoService;
import br.com.api.agenda.service.AvisosService;

@RestController
@CrossOrigin(origins = "*") 
public class AvisosControler {

    @Autowired
    private AvisosService as;

    @Autowired
    private AlunoAvisoService alunoavisoservice;

    // Cadastrar
    @PostMapping("/cadastrar-aviso")
    public ResponseEntity<?> cadastrarAvio(@RequestBody Avisos AvisoModel){
        
        return as.CadastrarAlterarAviso(AvisoModel, "cadastrar"); 
    }

    //Listar
    @GetMapping("/listar-avisos")
        public Iterable<Avisos> listarAvisos(){
        Iterable<Avisos> avisos = as.listar();

        return avisos;
    }

    //Editar 
    @PutMapping("/editar-avisos")
    public ResponseEntity<?> editarAvisos(@RequestBody Avisos AvisoModel){
        return as.CadastrarAlterarAviso(AvisoModel, "alterar");
    }

    // Remover
    @DeleteMapping("/remover-avisos/{id}")
    public ResponseEntity<RespostaModelo> removerAvisos(@PathVariable long id){
        return as.remover(id);
    } 

    // Buscar avisos por aluno
    @GetMapping("/alunos/{alunoId}/avisos")
    public List<AlunoAviso> buscarAvisosPorAluno(@PathVariable Long alunoId) {
        return alunoavisoservice.buscarAvisosPorAluno(alunoId);
    }

    // Remover aviso específico para um aluno
    @DeleteMapping("/aluno/{alunoId}/aviso/{avisoId}")
    public ResponseEntity<Void> deletarAvisoAluno(@PathVariable Long alunoId, @PathVariable Long avisoId) {
        alunoavisoservice.deletarAvisoAluno(alunoId, avisoId);
        return ResponseEntity.noContent().build(); // Retorna status 204 (No Content) quando for bem-sucedido
    }
}
    

