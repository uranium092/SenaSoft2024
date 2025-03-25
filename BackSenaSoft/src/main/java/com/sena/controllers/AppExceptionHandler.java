package com.sena.controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class AppExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
        Map<String, Object> exception = new HashMap<>();
        exception.put("timestamp", LocalDateTime.now());
        exception.put("message", ex.getMessage());
        exception.put("details", request.getDescription(false));
		System.out.println("Exception: " + ex.getMessage());
        return ResponseEntity.internalServerError().body(exception); 
    }
	
}