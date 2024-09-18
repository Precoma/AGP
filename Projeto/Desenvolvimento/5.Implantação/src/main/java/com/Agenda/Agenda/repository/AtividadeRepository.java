package com.Agenda.Agenda.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import com.Agenda.Agenda.model.Materia;
import com.Agenda.Agenda.model.Atividade;

public interface AtividadeRepository extends CrudRepository<Atividade, String> {
	Iterable<Atividade>findByMateria(Materia materia);	
	Atividade findById(long id);

}
