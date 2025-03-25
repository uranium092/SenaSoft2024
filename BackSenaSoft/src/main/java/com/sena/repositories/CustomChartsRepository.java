package com.sena.repositories;

import java.util.List;

import org.bson.Document;

public interface CustomChartsRepository {
	public abstract List<Document> getChartsOfCurrentYear();
}