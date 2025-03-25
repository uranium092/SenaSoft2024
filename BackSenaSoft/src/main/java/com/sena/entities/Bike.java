package com.sena.entities;

import java.util.HashMap;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Bike")
public class Bike {
	@Id
	private int id;
	
	private String color;

	private boolean status;
	
	private int price;
	
	private String brand;
	
	private String image;
	
	private HashMap<String,Object> dataReserved;
	
	public Bike() {
		
	}

	public Bike(int id, String color, int price, String brand, String image) {
		super();
		this.id = id;
		this.color = color;
		this.status = false;
		this.price = price;
		this.brand = brand;
		this.image = image;
		this.dataReserved = new HashMap<String,Object>();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public HashMap<String, Object> getDataReserved() {
		return dataReserved;
	}

	public void setDataReserved(HashMap<String, Object> dataReserved) {
		this.dataReserved = dataReserved;
	}

	@Override
	public String toString() {
		return "Bike [id=" + id + ", color=" + color + ", status=" + status + ", price=" + price + ", brand=" + brand
				+ ", image=" + image + ", dataReserved=" + dataReserved + "]";
	}


}