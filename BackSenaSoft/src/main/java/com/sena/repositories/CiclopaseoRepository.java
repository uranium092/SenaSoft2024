package com.sena.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sena.entities.*;

public interface CiclopaseoRepository extends MongoRepository<Ciclopaseo, Integer>{

}
