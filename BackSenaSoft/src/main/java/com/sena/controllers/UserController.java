package com.sena.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.entities.User;
import com.sena.repositories.UserRepository;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	
	@Autowired private UserRepository repository;
	
	@PostMapping("/newUser")
	public ResponseEntity<?> insertUser(@RequestBody User user){
		repository.save(user);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	
	@GetMapping("/auth/{id}")
	public ResponseEntity<?> validateLogin(@PathVariable String id){
		Optional<User>match=repository.findById(id);
		return match.isEmpty()?ResponseEntity.status(HttpStatus.NOT_FOUND).build()
				:ResponseEntity.status(HttpStatus.OK).body(match.get());
	}
	
}