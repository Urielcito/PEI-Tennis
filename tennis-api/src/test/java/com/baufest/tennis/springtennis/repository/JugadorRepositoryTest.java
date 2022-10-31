package com.baufest.tennis.springtennis.repository;

import com.baufest.tennis.springtennis.model.Entrenador;
import com.baufest.tennis.springtennis.model.Jugador;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class JugadorRepositoryTest {

    private static final Entrenador ENTRENADOR = new Entrenador(1L, "Uriel");
    private static final Jugador JUGADOR1 = new Jugador("C", 2, ENTRENADOR);
    private static final Jugador JUGADOR2 = new Jugador("A", 1, ENTRENADOR);
    private static final Jugador JUGADOR3 = new Jugador("B", 3, ENTRENADOR);

    @Autowired
    private JugadorRepository repository;

    @Test
    public void findAllByOrderByNombreAsc() {
        List<Jugador> jugadoresExpected = new ArrayList<>();
        jugadoresExpected.add(JUGADOR2);
        jugadoresExpected.add(JUGADOR3);
        jugadoresExpected.add(JUGADOR1);

        repository.save(JUGADOR1);
        repository.save(JUGADOR2);
        repository.save(JUGADOR3);

        List<Jugador> judadores = repository.findAllByOrderByNombreAsc();
        assertNotNull(judadores);
        assertEquals(jugadoresExpected,judadores);
    }

}
