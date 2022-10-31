package com.baufest.tennis.springtennis.mapper;

import com.baufest.tennis.springtennis.dto.EntrenadorDTO;
import com.baufest.tennis.springtennis.model.Entrenador;
import org.springframework.stereotype.Component;

@Component
public class EntrenadorMapperImpl implements EntrenadorMapper{
    @Override
    public EntrenadorDTO toDTO(Entrenador entity){
        if(entity == null){
            return null;
        }
        EntrenadorDTO entrenadorDTO = new EntrenadorDTO();
        entrenadorDTO.setId(entity.getId());
        entrenadorDTO.setNombre(entity.getNombre());
        return entrenadorDTO;
    }

    @Override
    public Entrenador fromDTO(EntrenadorDTO dto){
        if(dto == null)
        {
            return null;
        }
        Entrenador unEntrenador = new Entrenador();
        unEntrenador.setId(dto.getId());
        unEntrenador.setNombre(dto.getNombre());
        return unEntrenador;
    }
}
