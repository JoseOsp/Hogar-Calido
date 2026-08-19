package com.hogarcalido.service;

import com.hogarcalido.model.Caracteristica;
import com.hogarcalido.repository.CaracteristicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService {

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    public List<Caracteristica> obtenerTodas() {
        return caracteristicaRepository.findAll();
    }

    public Optional<Caracteristica> obtenerPorId(Long id) {
        return caracteristicaRepository.findById(id);
    }

    public Caracteristica guardar(Caracteristica caracteristica) {
        return caracteristicaRepository.save(caracteristica);
    }

    public void eliminar(Long id) {
        caracteristicaRepository.deleteById(id);
    }
}