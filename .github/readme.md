# Portfolio API Spring Boot Application

A Spring Boot application that provides a contact form API endpoint with Gmail integration for sending emails.

## Features

- POST `/contact` endpoint for contact form submissions
- Input validation for required fields
- Gmail SMTP integration for email sending
- Proper error handling and response formatting
- Java 17 and Maven support

## Project Structure

```
src/
├── main/
│   ├── java/com/backend/portfolio/
│   │   ├── PortfolioApplication.java
│   │   ├── controller/ContactController.java
│   │   ├── dto/ContactRequest.java
│   │   ├── service/EmailService.java
│   │   └── config/MailConfig.java
│   └── resources/
│       └── application.properties
└── test/
    └── java/com/backend/portfolio/
        └── PortfolioApplicationTests.java
```

## Configuration

Before running the application, update the following properties in `src/main/resources/application.properties`:

```properties
# Replace with your Gmail credentials
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password

# The recipient email (currently set to aditya@gmail.com)
app.email.recipient=aditya@gmail.com
```

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this app password in the `spring.mail.password` field

## API Usage

### POST /contact

Submit a contact form with the following JSON structure:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry about services",
  "message": "I would like to know more about your services."
}
```

#### Required Fields:

- `name` (string)
- `email` (string, must be valid email format)
- `subject` (string)
- `message` (string)

#### Optional Fields:

- `phone` (string)

#### Response Examples:

**Success (200 OK):**

```json
{
  "success": true,
  "message": "Contact form submitted successfully. We will get back to you soon!"
}
```

**Validation Error (400 Bad Request):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["name: Name is required", "email: Email must be valid"]
}
```

**Server Error (500 Internal Server Error):**

```json
{
  "success": false,
  "message": "Failed to send email: [error details]"
}
```

## Running the Application

### Prerequisites

- Java 17
- Maven 3.6+

### Build and Run

```bash
mvn clean install
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### Test the API

```bash
curl -X POST http://localhost:8080/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## Dependencies

- Spring Boot Starter Web
- Spring Boot Starter Validation
- Spring Boot Starter Mail
- Spring Boot Starter Test

## Notes

- The application uses Gmail SMTP for sending emails
- All emails are sent to the configured recipient address (`aditya@gmail.com`)
- The sender's email is set as the reply-to address for easy response
- Input validation is handled using Bean Validation annotations
- Proper error handling and logging is implemented
