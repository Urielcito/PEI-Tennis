package com.baufest.tennis.springtennis.dto;

import org.json.JSONObject;

import javax.persistence.*;

public class EntrenadorDTO {

    private Long id;

    private String nombre;



    public EntrenadorDTO(){}


    public EntrenadorDTO(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public EntrenadorDTO(String nombre) {
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Entrenador{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                '}';
    }

    public JSONObject toJSONObject(){
        JSONObject jo = new JSONObject();
        jo.put("id",getId());
        jo.put("nombre", getNombre());
        return jo;
    }
}
