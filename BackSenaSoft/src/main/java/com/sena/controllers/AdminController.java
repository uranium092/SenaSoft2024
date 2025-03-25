package com.sena.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.entities.Admin;
import com.sena.repositories.AdminRepository;
import com.sena.repositories.ChartsRepository;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

	@Autowired private AdminRepository repository;
	
	@Autowired private ChartsRepository chartsRepository;
	
	@GetMapping("/auth/{id}")
	public ResponseEntity<?> validateLoginAdmin(@PathVariable String id){
		Optional<Admin> match=repository.findById(id);
		return match.isEmpty()?ResponseEntity.notFound().build():ResponseEntity.ok().build(); 
	}
	
	@GetMapping("/dataChart")
	public ResponseEntity<?> getDataChart(){
		return ResponseEntity.ok(chartsRepository.getChartsOfCurrentYear());
	}
	
}
