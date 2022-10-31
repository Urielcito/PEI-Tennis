package com.baufest.tennis.springtennis.mapper;

import com.baufest.tennis.springtennis.dto.CanchaDTO;
import com.baufest.tennis.springtennis.model.Cancha;
import org.springframework.stereotype.Component;

@Component
public class CanchaMapperImpl implements CanchaMapper {

    @Override
    public CanchaDTO toDTO(Cancha entity) {
        if ( entity == null ) {
            return null;
        }

        CanchaDTO canchaDTO = new CanchaDTO();

        canchaDTO.setId( entity.getId() );
        canchaDTO.setNombre( entity.getNombre() );
        canchaDTO.setDireccion( entity.getDireccion() );

        return canchaDTO;
    }

    @Override
    public Cancha fromDTO(CanchaDTO entity) {
        if ( entity == null ) {
            return null;
        }

        Cancha cancha = new Cancha();

        cancha.setId( entity.getId() );
        cancha.setNombre( entity.getNombre() );
        cancha.setDireccion( entity.getDireccion() );

        return cancha;
    }
}
