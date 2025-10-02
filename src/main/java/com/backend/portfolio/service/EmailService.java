package com.backend.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.backend.portfolio.dto.ContactRequest;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    
    private final JavaMailSender mailSender;
    private final InputSanitizerService inputSanitizerService;

    @Value("${contact.receiver.email}")
    private String receiverEmail;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Autowired
    public EmailService(JavaMailSender mailSender, InputSanitizerService inputSanitizerService) {
        this.mailSender = mailSender;
        this.inputSanitizerService = inputSanitizerService;
    }

    public void sendContactEmail(ContactRequest contactRequest) {
        try {
            // Additional validation before sending
            if (!inputSanitizerService.isValidEmail(contactRequest.getEmail())) {
                logger.error("Invalid email format attempted: {}", contactRequest.getEmail());
                throw new RuntimeException("Invalid email format");
            }
            
            SimpleMailMessage message = new SimpleMailMessage();
            
            // Set email properties
            message.setFrom(senderEmail);
            message.setTo(receiverEmail);
            message.setSubject("ENQUIRY 🔔: " + inputSanitizerService.sanitize(contactRequest.getSubject()));
            
            // Build email body with sanitized content
            StringBuilder emailBody = new StringBuilder();
            emailBody.append("You have received a new contact form submission:\n\n");
            emailBody.append("Name: ").append(inputSanitizerService.sanitize(contactRequest.getName())).append("\n");
            emailBody.append("Email: ").append(contactRequest.getEmail()).append("\n");
            
            if (contactRequest.getPhone() != null && !contactRequest.getPhone().trim().isEmpty()) {
                emailBody.append("Phone: ").append(inputSanitizerService.sanitize(contactRequest.getPhone())).append("\n");
            }
            
            emailBody.append("Subject: ").append(inputSanitizerService.sanitize(contactRequest.getSubject())).append("\n");
            emailBody.append("\nMessage:\n").append(inputSanitizerService.sanitize(contactRequest.getMessage())).append("\n\n");
            emailBody.append("---\n");
            emailBody.append("This email was sent from your contact form.");
            emailBody.append("\nTimestamp: ").append(java.time.LocalDateTime.now());
            
            message.setText(emailBody.toString());
            
            // Set reply-to address to the sender's email (already validated)
            message.setReplyTo(contactRequest.getEmail());
            
            // Send the email
            mailSender.send(message);
            
            logger.info("Contact email sent successfully from: {}", contactRequest.getEmail());
            
        } catch (org.springframework.mail.MailException e) {
            logger.error("Failed to send contact email: {}", e.getMessage());
            throw new RuntimeException("Failed to send contact email", e);
        } catch (IllegalArgumentException e) {
            logger.error("Invalid argument in email: {}", e.getMessage());
            throw new RuntimeException("Invalid email data", e);
        }
    }
}