package com.backend.portfolio.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.portfolio.dto.ContactRequest;
import com.backend.portfolio.service.EmailService;
import com.backend.portfolio.service.InputSanitizerService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/contact")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    
    private final EmailService emailService;
    private final InputSanitizerService inputSanitizerService;

    @Autowired
    public ContactController(EmailService emailService, InputSanitizerService inputSanitizerService) {
        this.emailService = emailService;
        this.inputSanitizerService = inputSanitizerService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContact(@Valid @RequestBody ContactRequest contactRequest, 
                                                           BindingResult bindingResult,
                                                           HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Check for validation errors
            if (bindingResult.hasErrors()) {
                List<String> errors = bindingResult.getFieldErrors()
                        .stream()
                        .map(error -> error.getField() + ": " + error.getDefaultMessage())
                        .collect(Collectors.toList());
                
                logger.warn("Validation failed for contact form from IP: {}", getClientIP(request));
                response.put("success", false);
                response.put("message", "Validation failed");
                response.put("errors", errors);
                return ResponseEntity.badRequest().body(response);
            }

            // Additional security validation
            if (!inputSanitizerService.isValidEmail(contactRequest.getEmail())) {
                logger.warn("Invalid email format attempted from IP: {}", getClientIP(request));
                response.put("success", false);
                response.put("message", "Invalid email format");
                return ResponseEntity.badRequest().body(response);
            }

            if (!inputSanitizerService.isValidPhoneNumber(contactRequest.getPhone())) {
                logger.warn("Invalid phone number format attempted from IP: {}", getClientIP(request));
                response.put("success", false);
                response.put("message", "Invalid phone number format");
                return ResponseEntity.badRequest().body(response);
            }

            // Check for suspicious content
            if (inputSanitizerService.containsSuspiciousContent(contactRequest.getName()) ||
                inputSanitizerService.containsSuspiciousContent(contactRequest.getSubject()) ||
                inputSanitizerService.containsSuspiciousContent(contactRequest.getMessage())) {
                
                logger.warn("Suspicious content detected from IP: {}", getClientIP(request));
                response.put("success", false);
                response.put("message", "Message content not allowed");
                return ResponseEntity.badRequest().body(response);
            }

            // Sanitize input fields
            contactRequest.setName(inputSanitizerService.sanitize(contactRequest.getName()));
            contactRequest.setSubject(inputSanitizerService.sanitize(contactRequest.getSubject()));
            contactRequest.setMessage(inputSanitizerService.sanitize(contactRequest.getMessage()));
            if (contactRequest.getPhone() != null) {
                contactRequest.setPhone(inputSanitizerService.sanitize(contactRequest.getPhone()));
            }

            // Send email
            emailService.sendContactEmail(contactRequest);
            
            logger.info("Contact form submitted successfully from IP: {}", getClientIP(request));
            response.put("success", true);
            response.put("message", "Contact form submitted successfully. We will get back to you soon!");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error processing contact form from IP: {}, Error: {}", 
                        getClientIP(request), e.getMessage());
            response.put("success", false);
            response.put("message", "An error occurred while processing your request. Please try again later.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private String getClientIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }


}