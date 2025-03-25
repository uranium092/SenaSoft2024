package com.sena;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sena.entities.Admin;
import com.sena.entities.Bike;
import com.sena.repositories.AdminRepository;
import com.sena.repositories.BikeRepository;

@Configuration
public class DataInitializer {

	@Autowired
	private AdminRepository admin;
	
	@Autowired
	private BikeRepository bikes;

    @Bean
    CommandLineRunner initData() {
        return args -> {
           if(admin.count()<1) {
        	   admin.save(new Admin("9999"));
           }
           if(bikes.findById(1).isEmpty()) {
        	   bikes.saveAll(Arrays.asList(new Bike(1, "Blue", 4000, "Venzo", "https://http2.mlstatic.com/D_NQ_NP_668335-MLU75529916102_042024-O.webp")));
           }
        };
    }
	
}