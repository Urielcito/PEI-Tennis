package com.baufest.tennis.springtennis.controller;

import com.baufest.tennis.springtennis.dto.EntrenadorDTO;
import com.baufest.tennis.springtennis.service.EntrenadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("springtennis/api/v1/entrenadores")
public class EntrenadorController {
    private final EntrenadorService entrenadorService;
    
    @Autowired
    public EntrenadorController(EntrenadorService entrenadorService){
        this.entrenadorService = entrenadorService;
    }
    
    @GetMapping
    public ResponseEntity<List<EntrenadorDTO>> listAll(){
        return ResponseEntity.ok(entrenadorService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntrenadorDTO> getById(@PathVariable Long id){
        return ResponseEntity.ok(entrenadorService.getById(id));
    }
    @PostMapping
    public ResponseEntity<EntrenadorDTO> saveEntrenador(@RequestBody EntrenadorDTO entrenador){
        EntrenadorDTO savedEntrenador = entrenadorService.save(entrenador);
        return new ResponseEntity<>(savedEntrenador, HttpStatus.CREATED);
    }



    @PutMapping("/{id}")
    public ResponseEntity<EntrenadorDTO> updateEntrenador(@PathVariable Long id, @RequestBody EntrenadorDTO entrenador){
        entrenador.setId(id);
        EntrenadorDTO updatedEntrenador = entrenadorService.update(entrenador);
        return ResponseEntity.ok(updatedEntrenador);
    }


    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteEntrenador(@PathVariable Long id) {
        ResponseEntity<Void> response;
        entrenadorService.delete(id);
        response = new ResponseEntity<>(HttpStatus.OK);
        return response;
    }
}
