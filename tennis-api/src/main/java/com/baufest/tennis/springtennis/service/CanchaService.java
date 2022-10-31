package com.baufest.tennis.springtennis.service;

import com.baufest.tennis.springtennis.dto.CanchaDTO;
import com.baufest.tennis.springtennis.model.Cancha;

import java.util.List;

public interface CanchaService {
	List<CanchaDTO> listAll();

	CanchaDTO getById(Long id);

	CanchaDTO save(CanchaDTO cancha);

	CanchaDTO update(CanchaDTO cancha);

	void delete(Long id);

}
