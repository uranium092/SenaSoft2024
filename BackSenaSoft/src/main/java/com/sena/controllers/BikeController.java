package com.sena.controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.entities.Bike;
import com.sena.entities.Charts;
import com.sena.repositories.BikeRepository;
import com.sena.repositories.ChartsRepository;

@RestController
@RequestMapping("/bike")
@CrossOrigin
public class BikeController {
	
	@Autowired private BikeRepository repository;
	@Autowired private ChartsRepository chartsRepository;
	
	@GetMapping("/allBikes")
	public ResponseEntity<?> findAllBikes(){
		return ResponseEntity.status(HttpStatus.OK).body(repository.findAll());
	}
	
	@GetMapping("/servicesByUser/{idUser}")
	public ResponseEntity<?> findServicesByUser(@PathVariable String idUser){
		Bike match=verifyExistingServiceByUser(idUser);
		return match!=null?ResponseEntity.status(HttpStatus.OK).body(match):ResponseEntity.notFound().build();
	}
	
	private Bike verifyExistingServiceByUser(String id) {
		for(Bike bike:repository.findAll()) {
			HashMap<String,Object> dataReserved=bike.getDataReserved();
			if(dataReserved.isEmpty()) continue;
			String idUserThisBike=(String)dataReserved.get("idUser");
			if(idUserThisBike!=null && idUserThisBike.equals(id)) {
				return bike;
			}
		}
		return null; 
	}

	@PutMapping("/rentBike/{idBike}")
	private ResponseEntity<?> rentBike(@RequestBody HashMap<String,Object>dataRent, @PathVariable int idBike){
		Optional<Bike>match=repository.findById(idBike);
		System.out.println(match.get().toString());
		dataRent.put("dateInit", LocalDateTime.now());
		match.get().setDataReserved(dataRent);
		match.get().setStatus(true);
		repository.save(match.get());
		return ResponseEntity.ok().build(); 
		
	}
	
	@PutMapping("/removeRent/{idBike}/{total}")
	private ResponseEntity<?> removeRent(@PathVariable int idBike, @PathVariable double total){
		Optional<Bike>match=repository.findById(idBike);
		if(match.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		Charts registry=new Charts(LocalDateTime.now(),total);
		match.get().setDataReserved(new HashMap<String,Object>());
		match.get().setStatus(false);
		repository.save(match.get());
		chartsRepository.save(registry);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/newBike")
	public ResponseEntity<?> newBike(@RequestBody Bike dataBike){
		dataBike.setId(generateIdDocument());
		dataBike.setDataReserved(new HashMap<String,Object>());
		repository.save(dataBike);
		return ResponseEntity.ok().build();
	}
	
	private int generateIdDocument() {
		List<Bike>bikes=repository.findAll();
		return bikes.size()==0?1:bikes.get(bikes.size()-1).getId()+1; 
	}
	
	@GetMapping("/bikeById/{id}")
	public ResponseEntity<?> findBikeById(@PathVariable int id){
		return ResponseEntity.ok(repository.findById(id).get());
	}
	
}