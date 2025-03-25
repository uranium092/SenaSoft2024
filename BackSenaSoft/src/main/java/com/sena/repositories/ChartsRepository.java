package com.sena.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sena.entities.Charts;

@Repository
public interface ChartsRepository extends MongoRepository<Charts, String>,CustomChartsRepository{

}