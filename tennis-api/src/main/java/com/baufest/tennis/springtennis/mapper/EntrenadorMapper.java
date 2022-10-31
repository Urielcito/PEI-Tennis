package com.baufest.tennis.springtennis.mapper;

import com.baufest.tennis.springtennis.dto.EntrenadorDTO;
import com.baufest.tennis.springtennis.model.Entrenador;

public interface EntrenadorMapper {
    EntrenadorDTO toDTO(Entrenador entity);
    Entrenador fromDTO(EntrenadorDTO dto);
}
