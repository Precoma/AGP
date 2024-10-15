package br.com.api.agenda.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.agenda.model.AlunoAtividade;
import br.com.api.agenda.model.Atividade;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.repository.AlunoAtividadeRepository;
import br.com.api.agenda.service.AlunoAtividadeService;
import br.com.api.agenda.service.AtividadeService;

@RestController
@CrossOrigin(origins = "*")
public class AtividadeController {

    @Autowired
    private AtividadeService as;

    @Autowired
    private AlunoAtividadeService alunoAtividadeService;

    @Autowired
    private AlunoAtividadeRepository alunoAtividadeRepository;

    //Listar

    @GetMapping("/listar-atividade")
    public Iterable<Atividade> listarAtividade(){
        Iterable<Atividade> todasAtividades = as.listar();

        List<Atividade> atividadesPendentes = new ArrayList<>();
		List<Atividade> atividadesConcluidas = new ArrayList<>();

        for (Atividade atividade : todasAtividades) {
			if (atividade.isFeita()) {
				atividadesConcluidas.add(atividade);
			} else {
				atividadesPendentes.add(atividade);
			}
		}

        return todasAtividades;
    }

    // Editar
    @PutMapping("/editar-atividade")
    public ResponseEntity<?> editarAtividade(@RequestBody Atividade am){
        return as.CadastrarAlterarAtividade(am, "alterar");
    }

    // Cadastrar
    @PostMapping("/cadastrar-atividade")
    public ResponseEntity<?> cadastrarAtividade(@RequestBody Atividade am){
        return as.CadastrarAlterarAtividade(am, "cadastrar"); 
    }

    // Remover
    @DeleteMapping("/remover-atividade/{id}")
    public ResponseEntity<RespostaModelo> removerAtividade(@PathVariable long id){
        return as.remover(id);
    }

    @GetMapping("/")
    public String rota(){
        return "Api da agenda funcionando";
    }

// Endpoint para marcar uma atividade como feita
@PutMapping("/{alunoId}/atividades/{atividadeId}/marcarFeita")
public ResponseEntity<String> marcarAtividadeFeita(
        @PathVariable Long alunoId,
        @PathVariable Long atividadeId) {
    
    try {
        alunoAtividadeService.marcarAtividadeFeita(alunoId, atividadeId);
        return ResponseEntity.ok("Atividade marcada como feita!");
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

// Endpoint para desmarcar uma atividade como feita
@PutMapping("/{alunoId}/atividades/{atividadeId}/desmarcarFeita")
public ResponseEntity<String> desmarcarAtividadeFeita(
        @PathVariable Long alunoId,
        @PathVariable Long atividadeId) {
    
    try {
        alunoAtividadeService.desmarcarAtividadeFeita(alunoId, atividadeId);
        return ResponseEntity.ok("Atividade desmarcada como feita!");
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

@GetMapping("/alunos/{alunoId}/atividades")
public List<AlunoAtividade> buscarAtividadesPorAluno(@PathVariable Long alunoId) {
    return alunoAtividadeService.buscarAtividadesPorAluno(alunoId);
}

@DeleteMapping("/alunos/{alunoId}/atividades/{atividadeId}/delete")
public ResponseEntity<?> removerAtividadeAluno(@PathVariable Long alunoId, @PathVariable Long atividadeId) {
    Optional<AlunoAtividade> alunoAtividade = alunoAtividadeRepository.findByAlunoIdAndAtividadeId(alunoId, atividadeId);

    if (alunoAtividade.isPresent()) {
        alunoAtividadeRepository.deleteById(alunoAtividade.get().getId());
        return ResponseEntity.ok().body("Atividade removida com sucesso para o aluno.");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Atividade não encontrada para o aluno.");
    }
}

}
