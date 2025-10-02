package com.backend.portfolio.service;

import org.owasp.html.HtmlPolicyBuilder;
import org.owasp.html.PolicyFactory;
import org.springframework.stereotype.Service;

@Service
public class InputSanitizerService {

    private final PolicyFactory policy;

    public InputSanitizerService() {
        // Create a policy that allows no HTML tags (strips all HTML)
        this.policy = new HtmlPolicyBuilder().toFactory();
    }

    public String sanitize(String input) {
        if (input == null) {
            return null;
        }
        
        // Remove HTML tags and normalize whitespace
        String sanitized = policy.sanitize(input).trim();
        
        // Additional sanitization for common attack patterns
        sanitized = sanitized.replaceAll("(?i)javascript:", "")
                           .replaceAll("(?i)vbscript:", "")
                           .replaceAll("(?i)data:", "")
                           .replaceAll("(?i)on\\w+\\s*=", "");
        
        return sanitized;
    }

    public boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        
        // Basic email validation regex
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        return email.matches(emailRegex) && email.length() <= 254; // RFC 5321 limit
    }

    public boolean isValidPhoneNumber(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            return true; // Phone is optional
        }
        
        // Remove common phone number formatting
        String cleanPhone = phone.replaceAll("[\\s\\-\\(\\)\\+\\.]", "");
        
        // Check if it contains only digits and is reasonable length
        return cleanPhone.matches("\\d{7,15}"); // 7-15 digits is reasonable for phone numbers
    }

    public boolean containsSuspiciousContent(String input) {
        if (input == null) {
            return false;
        }
        
        String lowerInput = input.toLowerCase();
        
        // Check for common spam/malicious patterns
        String[] suspiciousPatterns = {
            "script", "javascript", "vbscript", "onload", "onerror", "onclick",
            "eval(", "document.cookie", "window.location", "document.write",
            "base64", "data:text/html", "php", "asp", "jsp", "<%", "%>",
            "select * from", "drop table", "insert into", "delete from",
            "union select", "1=1", "' or '1'='1", "admin'--", "viagra",
            "casino", "lottery", "winner", "congratulations", "claim now"
        };
        
        for (String pattern : suspiciousPatterns) {
            if (lowerInput.contains(pattern)) {
                return true;
            }
        }
        
        return false;
    }

    public boolean isReasonableLength(String input, int maxLength) {
        return input != null && input.length() <= maxLength;
    }
}