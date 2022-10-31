package com.baufest.tennis.springtennis.service;

import com.baufest.tennis.springtennis.dto.EntrenadorDTO;

import java.util.List;

public interface EntrenadorService {
    List<EntrenadorDTO> listAll();

    EntrenadorDTO getById(Long id);

    EntrenadorDTO save(EntrenadorDTO entrenador);

    EntrenadorDTO update(EntrenadorDTO entrenador);

    void delete(Long id);
}
