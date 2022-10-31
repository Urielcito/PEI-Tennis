package com.baufest.tennis.springtennis.service;

import java.util.List;

import com.baufest.tennis.springtennis.dto.PartidoDTO;
import com.baufest.tennis.springtennis.enums.ModoJugador;
import com.baufest.tennis.springtennis.model.Partido;

/**
 * <p>Service de Partido</p>
 * Este componente sera el encargado de aplicar la logica de negocio a los partidos antes de persistirlos en la base de datos
 * o de devolver dichas entradas desde la base de datos, es necesario que contenga el spring prototype @Service para su funcionamiento
 * ya que es la forma de declarar al momento de la inyeccion de dependencias que se trata de un service
 */
public interface PartidoService {
	/**
	 * <p>
	 *     Obtiene el listado de todos los partidos
	 * </p>
	 *
	 * @return List<PartidoDto>
	 */
	List<PartidoDTO> listAll();

	/**
	 * <p>
	 *     Obtiene el partido de id recibido
	 * </p>
	 *
	 * @param id
	 * @return PartidoDto
	 */
	PartidoDTO getById(Long id);

	/**
	 * <p>
	 *     Borra de la base de datos el partido que tiene el id recibido.
	 *     Si no se encuentra ningun partido con el id recibido se hace throw de
	 *     una exception "NoSuchElementException"
	 * </p>
	 * @param id
	 */
	void delete(Long id);

	/**
	 * <p>
	 *     Guarda el partido recibido. Si el id del partido recibido ya existe en la
	 *     base se hace throw de una exception "IllegalArgumentException"
	 * </p>
	 * @param partido
	 * @return PartidoDTO
	 */
    PartidoDTO save(PartidoDTO partido);

	/**
	 * <p>
	 *     Actualiza la información del partido recibido.
	 *     Busca el id del partido recibido en la base, si existe actualiza la información,
	 *     caso contrario se hace throw de una exception "NoSuchElementException"
	 * </p>
	 * @param partido
	 * @return PartidoDTO
	 */
	PartidoDTO update(PartidoDTO partido);

	/**
	 * <p>
	 *     Inicia el partido del ID recibido
	 * </p>
	 * @param id
	 */
	void initGame(Long id);

	/**
	 * <p>
	 *     Suma puntos al modo de jugador recibido del partido del id recibido
	 * </p>
	 * @param id
	 * @param modo
	 * @return PartidoDTO
	 */
	PartidoDTO sumarPuntos(Long id, ModoJugador modo);
}