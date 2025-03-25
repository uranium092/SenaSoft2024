package com.sena.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.entities.Bike;
import com.sena.entities.Ciclopaseo;
import com.sena.repositories.BikeRepository;
import com.sena.repositories.CiclopaseoRepository;

@RestController
@RequestMapping("/ciclopaseo")
@CrossOrigin
public class CiclopaseoController {
	@Autowired private CiclopaseoRepository repository;
	
	@Autowired private BikeRepository repoBike;
	
	@PostMapping("/newCiclopaseo")
	public ResponseEntity<?> insertCicloPaseo(@RequestBody Ciclopaseo ciclopaseo){
		ciclopaseo.setId(generateIdDocument());
		return ResponseEntity.ok(repository.save(ciclopaseo)); 
	}
	
	public int generateIdDocument() {
		List<Ciclopaseo>ciclopaseos=repository.findAll();
		return ciclopaseos.size()==0?1:ciclopaseos.get(ciclopaseos.size()-1).getId()+1;
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<?> getAll(){
		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/findById/{id}")
	public ResponseEntity<?>findById(@PathVariable int id){
		return ResponseEntity.ok(repository.findById(id).get());
	}
	
	@DeleteMapping("/remove/{id}")
	public ResponseEntity<?>removeCiclo(@PathVariable int id){
		removeCascade(id);
		repository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	private void removeCascade(int idBase) {
		for(Bike bike:repoBike.findAll()) {
			if(bike.isStatus()) {
				if(bike.getDataReserved().get("type").equals("ciclo")) {
					if(bike.getDataReserved().get("idCiclo").equals(idBase)) {
						bike.setStatus(false);
						bike.setDataReserved(new HashMap<String,Object>());
						repoBike.save(bike);
					}
				}
			}
		}
	}
}