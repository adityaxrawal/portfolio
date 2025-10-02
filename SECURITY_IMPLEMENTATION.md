# Portfolio Backend API - Security Implementation

This Spring Boot application implements comprehensive API security measures including rate limiting, input validation, and protection against common web attacks.

## 🛡️ Security Features Implemented

### 1. **Rate Limiting**

- **Technology**: Bucket4j with Caffeine Cache
- **Implementation**: Token bucket algorithm
- **Configuration**:
  - Default: 10 requests per minute per IP address
  - Configurable via `application.properties`
  - Automatic cache eviction after 1 hour of inactivity
- **Response**: HTTP 429 (Too Many Requests) with retry-after headers

### 2. **Input Validation & Sanitization**

- **Field Validation**:
  - Name: 2-100 characters, letters/spaces/hyphens/apostrophes only
  - Email: Valid email format, max 254 characters
  - Phone: Optional, digits and common formatting characters only
  - Subject: 3-200 characters
  - Message: 10-2000 characters
- **Content Sanitization**:
  - HTML tag removal using OWASP Java HTML Sanitizer
  - XSS prevention (script tags, javascript:, vbscript:, etc.)
  - SQL injection pattern detection
  - Spam/malicious content filtering

### 3. **Security Headers**

- **X-Frame-Options**: DENY (prevents clickjacking)
- **X-Content-Type-Options**: nosniff (prevents MIME sniffing)
- **X-XSS-Protection**: 1; mode=block (XSS protection)
- **Content-Security-Policy**: Strict CSP policy
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Disabled geolocation, microphone, camera, payment

### 4. **CORS Configuration**

- Configurable allowed origins
- Supports credentials
- Preflight request handling
- Configurable methods and headers

### 5. **Request Size Limits**

- Max HTTP header size: 8KB
- Max POST size: 1MB
- Prevents large payload attacks

### 6. **Error Handling & Logging**

- Global exception handler
- IP-based logging for security events
- No sensitive data exposure in error messages
- Structured error responses

## 📋 Configuration

### Rate Limiting Settings (`application.properties`)

```properties
# Rate limiting configuration
rate.limit.capacity=10                # Maximum requests in bucket
rate.limit.refill.tokens=10          # Tokens refilled per period
rate.limit.refill.duration=1         # Refill period in minutes
rate.limit.cache.size=10000         # Maximum cached IP addresses
```

### CORS Settings

```properties
# CORS configuration
cors.allowed.origins=http://localhost:3000,https://yourdomain.com
cors.allowed.methods=GET,POST,PUT,DELETE,OPTIONS
```

### Server Security Settings

```properties
# Server security
server.max-http-header-size=8KB
server.tomcat.max-post-size=1MB
server.tomcat.max-http-form-post-size=1MB
```

## 🔧 Dependencies Added

```xml
<!-- Rate Limiting -->
<dependency>
    <groupId>com.bucket4j</groupId>
    <artifactId>bucket4j-core</artifactId>
    <version>8.7.0</version>
</dependency>

<!-- In-memory cache -->
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>

<!-- Input sanitization -->
<dependency>
    <groupId>com.googlecode.owasp-java-html-sanitizer</groupId>
    <artifactId>owasp-java-html-sanitizer</artifactId>
    <version>20220608.1</version>
</dependency>
```

## 🚀 API Endpoints

### POST `/contact`

Submits a contact form with comprehensive security validation.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Contact Subject",
  "message": "Your message here"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Contact form submitted successfully. We will get back to you soon!"
}
```

**Rate Limited Response (429):**

```json
{
  "success": false,
  "message": "Rate limit exceeded. Please try again in 30 seconds.",
  "retryAfter": 30
}
```

**Validation Error Response (400):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["name: Name is required", "email: Email must be valid"]
}
```

## 🧪 Testing Security Features

Run the included test script:

```bash
chmod +x test-security.sh
./test-security.sh
```

### Manual Testing Examples

1. **Valid Request:**

```bash
curl -X POST "http://localhost:8081/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "Valid test message"
  }'
```

2. **Rate Limiting Test:**

```bash
# Send 12 rapid requests to trigger rate limiting
for i in {1..12}; do
  curl -X POST "http://localhost:8081/contact" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"User $i\", \"email\": \"test$i@example.com\", \"subject\": \"Test $i\", \"message\": \"Test message $i\"}" \
    -w "Status: %{http_code}\n"
done
```

3. **Security Headers Check:**

```bash
curl -I "http://localhost:8081/contact" -X OPTIONS
```

## 🛠️ Architecture

### Core Components

1. **RateLimitConfig**: Configures Bucket4j with Caffeine cache
2. **RateLimitInterceptor**: Implements per-IP rate limiting
3. **SecurityHeadersInterceptor**: Adds security headers to all responses
4. **InputSanitizerService**: Validates and sanitizes input data
5. **GlobalExceptionHandler**: Centralized error handling with security logging
6. **SecurityConfig**: CORS and general security configuration

### Flow Diagram

```
Request → SecurityHeaders → RateLimit → Validation → Sanitization → Email → Response
```

## 🔍 Security Considerations

### Implemented Protections:

- ✅ Rate limiting (DDoS protection)
- ✅ Input validation (injection attacks)
- ✅ XSS prevention
- ✅ SQL injection prevention
- ✅ CSRF protection via CORS
- ✅ Clickjacking protection
- ✅ Content type sniffing protection
- ✅ Large payload attacks protection
- ✅ Spam/malicious content filtering

### Additional Production Recommendations:

- Enable HTTPS and add HSTS headers
- Implement request signing/authentication for sensitive operations
- Add IP whitelisting for admin operations
- Implement distributed rate limiting for multi-instance deployments
- Add request/response logging for audit trails
- Consider adding CAPTCHA for public forms
- Implement geolocation-based restrictions if needed

## 📊 Monitoring & Logging

The application logs security events including:

- Failed validation attempts
- Rate limiting triggers
- Suspicious content detection
- Error conditions with IP tracking

Log levels are configurable via `application.properties`:

```properties
logging.level.com.backend.portfolio=INFO
```

## 🚨 Security Incident Response

When security events are detected:

1. Events are logged with IP addresses
2. Rate limiting automatically blocks excessive requests
3. Malicious content is rejected with generic error messages
4. No sensitive information is exposed in error responses

## 📝 API Security Best Practices Implemented

1. **Principle of Least Privilege**: Only necessary data is processed
2. **Input Validation**: All inputs are validated and sanitized
3. **Output Encoding**: Email content is properly encoded
4. **Error Handling**: Generic error messages prevent information leakage
5. **Rate Limiting**: Prevents abuse and DDoS attacks
6. **Security Headers**: Multiple layers of browser protection
7. **Logging**: Comprehensive security event logging
