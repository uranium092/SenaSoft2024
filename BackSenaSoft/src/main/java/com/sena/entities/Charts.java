package com.sena.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="charts")
public class Charts {
	
	@Id
	private String id;
	
	private LocalDateTime dateFinishRent;

	private double payAmount;
	
	public Charts() {
		
	}

	public Charts(LocalDateTime dateFinishRent, double payAmount) {
		super();
		this.dateFinishRent = dateFinishRent;
		this.payAmount = payAmount;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LocalDateTime getDateFinishRent() {
		return dateFinishRent;
	}

	public void setDateFinishRent(LocalDateTime dateFinishRent) {
		this.dateFinishRent = dateFinishRent;
	}

	public double getPayAmount() {
		return payAmount;
	}

	public void setPayAmount(double payAmount) {
		this.payAmount = payAmount;
	}
	
}