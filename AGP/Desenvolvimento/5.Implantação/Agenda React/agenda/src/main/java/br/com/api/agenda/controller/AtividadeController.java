package br.com.api.agenda.controller;

import java.util.ArrayList;
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

import br.com.api.agenda.model.Atividade;
import br.com.api.agenda.model.RespostaModelo;
import br.com.api.agenda.service.AtividadeService;

@RestController
@CrossOrigin(origins = "*")
public class AtividadeController {

    @Autowired
    private AtividadeService as;


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
        return "Api de produtos funcionando";
    }





    
}
