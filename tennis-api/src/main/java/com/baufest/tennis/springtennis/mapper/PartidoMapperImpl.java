package com.baufest.tennis.springtennis.mapper;

import com.baufest.tennis.springtennis.dto.PartidoDTO;
import com.baufest.tennis.springtennis.model.Partido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PartidoMapperImpl implements PartidoMapper {

     /* Utilizamos el Mapper para no acceder directamente a la base.
    Lo implementamos en el PartidoServiceImpl a traves del @Autowired
     */

    /* Esta funcion recibe como parametro un Partido
     * y en base a el parametro recibido genera una nueva instancia
     * de partido DTO.*/

    private final JugadorMapper jugadorMapper;
	private final CanchaMapper canchaMapper;

    @Autowired
    public PartidoMapperImpl(CanchaMapper canchaMapper, JugadorMapper jugadorMapper) {

        this.canchaMapper = canchaMapper;
        this.jugadorMapper = jugadorMapper;
    }

    /* Esta funcion recibe como parametro un Partido
     * y en base a el parametro recibido genera una nueva instancia
     * de partido DTO.*/
    @Override
    public PartidoDTO toDTO(Partido entity) {
        if ( entity == null ) {
            return null;
        }

        PartidoDTO partidoDTO = new PartidoDTO();

        partidoDTO.setId( entity.getId() );
        partidoDTO.setFechaComienzo( entity.getFechaComienzo() );
        partidoDTO.setEstado( entity.getEstado() );
        partidoDTO.setJugadorLocal( jugadorMapper.toDTO( entity.getJugadorLocal() ) );
        partidoDTO.setJugadorVisitante( jugadorMapper.toDTO( entity.getJugadorVisitante() ) );
        partidoDTO.setScoreLocal( entity.getScoreLocal() );
        partidoDTO.setPuntosGameActualLocal( entity.getPuntosGameActualLocal() );
        partidoDTO.setCantidadGamesLocal( entity.getCantidadGamesLocal() );
        partidoDTO.setScoreVisitante( entity.getScoreVisitante() );
        partidoDTO.setPuntosGameActualVisitante( entity.getPuntosGameActualVisitante() );
        partidoDTO.setCantidadGamesVisitante( entity.getCantidadGamesVisitante() );
        partidoDTO.setCancha( canchaMapper.toDTO( entity.getCancha() ) );

        return partidoDTO;
    }

    /* Esta funcion recibe como parametro un PartidoDTO
     * y hacemos un generamos una nueva instancia de Partido */
    @Override
    public Partido fromDTO(PartidoDTO entity) {
        if ( entity == null ) {
            return null;
        }

        Partido partido = new Partido();

        partido.setId( entity.getId() );
        partido.setFechaComienzo( entity.getFechaComienzo() );
        partido.setEstado( entity.getEstado() );
        partido.setJugadorLocal( jugadorMapper.fromDTO( entity.getJugadorLocal() ) );
        partido.setJugadorVisitante( jugadorMapper.fromDTO( entity.getJugadorVisitante() ) );
        partido.setScoreLocal( entity.getScoreLocal() );
        partido.setPuntosGameActualLocal( entity.getPuntosGameActualLocal() );
        partido.setCantidadGamesLocal( entity.getCantidadGamesLocal() );
        partido.setScoreVisitante( entity.getScoreVisitante() );
        partido.setPuntosGameActualVisitante( entity.getPuntosGameActualVisitante() );
        partido.setCantidadGamesVisitante( entity.getCantidadGamesVisitante() );
        partido.setCancha( canchaMapper.fromDTO( entity.getCancha() ) );

        return partido;
    }
}
