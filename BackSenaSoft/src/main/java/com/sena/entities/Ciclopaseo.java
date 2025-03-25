package com.sena.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Ciclopaseo")
public class Ciclopaseo {
	
	@Id
	private int id;
	
	private LocalDateTime date;
	
	private String description;
	
	private String from;
	
	private String to;
	
	private Object fromLt;
	
	private Object fromLg;
	
	private Object toLt;
	
	private Object toLg;
	
	private double distance;
	
	public Ciclopaseo() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public Object getFromLt() {
		return fromLt;
	}

	public void setFromLt(Object fromLt) {
		this.fromLt = fromLt;
	}

	public Object getFromLg() {
		return fromLg;
	}

	public void setFromLg(Object fromLg) {
		this.fromLg = fromLg;
	}

	public Object getToLt() {
		return toLt;
	}

	public void setToLt(Object toLt) {
		this.toLt = toLt;
	}

	public Object getToLg() {
		return toLg;
	}

	public void setToLg(Object toLg) {
		this.toLg = toLg;
	}

	public double getDistance() {
		return distance;
	}

	public void setDistance(double distance) {
		this.distance = distance;
	}

	public Ciclopaseo(int id, LocalDateTime date, String description, String from, String to, Object fromLt,
			Object fromLg, Object toLt, Object toLg, double distance) {
		super();
		this.id = id;
		this.date = date;
		this.description = description;
		this.from = from;
		this.to = to;
		this.fromLt = fromLt;
		this.fromLg = fromLg;
		this.toLt = toLt;
		this.toLg = toLg;
		this.distance = distance;
	}
	
}
 