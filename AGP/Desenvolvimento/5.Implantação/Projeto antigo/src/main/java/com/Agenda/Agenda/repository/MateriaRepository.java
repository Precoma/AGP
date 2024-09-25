package com.Agenda.Agenda.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import com.Agenda.Agenda.model.Materia;
import com.Agenda.Agenda.model.Professor;

public interface MateriaRepository extends CrudRepository<Materia, String>{
	Materia findByid(long id);
	List<Materia> findByProfessor(Professor professor);
}
