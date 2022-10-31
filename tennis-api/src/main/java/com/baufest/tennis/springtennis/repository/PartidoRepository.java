package com.baufest.tennis.springtennis.repository;

import com.baufest.tennis.springtennis.model.Partido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//Aca va la anotacion Repository para indicar que es un repositorio y pueda ser detectado por el autowired
@Repository
public interface PartidoRepository extends JpaRepository<Partido, Long> {

}
