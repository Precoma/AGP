package br.com.api.agenda.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.agenda.model.Avisos;

@Repository
public interface AvisosRepository extends CrudRepository<Avisos, Long>  {
    
}
