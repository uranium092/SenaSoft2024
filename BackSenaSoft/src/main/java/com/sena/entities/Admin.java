package com.sena.entities;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Admin")
public class Admin {
	@Id
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	
	public Admin() { }

	public Admin(String id) {
		super();
		this.id = id;
	}

	@Override
	public String toString() {
		return "Admin [id=" + id + "]";
	}
	
}
