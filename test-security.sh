#!/bin/bash

# Test script for Portfolio API Security Features
BASE_URL="http://localhost:8081"

echo "=== Portfolio API Security Test Suite ==="
echo ""

# Test 1: Basic valid request
echo "1. Testing valid contact form submission..."
curl -X POST "$BASE_URL/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Test Subject",
    "message": "This is a valid test message for the contact form."
  }' \
  -v
echo -e "\n\n"

# Test 2: Rate limiting test
echo "2. Testing rate limiting (sending multiple requests quickly)..."
for i in {1..12}; do
  echo "Request $i:"
  curl -X POST "$BASE_URL/contact" \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"Test User $i\",
      \"email\": \"test$i@example.com\",
      \"subject\": \"Rate Limit Test $i\",
      \"message\": \"Testing rate limiting with request number $i\"
    }" \
    -s -w "Status: %{http_code}\n"
  sleep 1
done
echo -e "\n"

# Test 3: Input validation
echo "3. Testing input validation..."
echo "3a. Missing required fields:"
curl -X POST "$BASE_URL/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "email": "invalid-email",
    "subject": "x",
    "message": ""
  }' \
  -s | jq .
echo ""

# Test 4: Suspicious content detection
echo "4. Testing suspicious content detection..."
curl -X POST "$BASE_URL/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hacker",
    "email": "hacker@evil.com",
    "subject": "Script Injection",
    "message": "This message contains <script>alert(\"XSS\")</script> malicious content"
  }' \
  -s | jq .
echo ""

# Test 5: SQL Injection attempt
echo "5. Testing SQL injection attempt..."
curl -X POST "$BASE_URL/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Robert\"; DROP TABLE users; --",
    "email": "test@test.com",
    "subject": "Test",
    "message": "SELECT * FROM users WHERE 1=1"
  }' \
  -s | jq .
echo ""

# Test 6: Oversized input
echo "6. Testing oversized input..."
LONG_MESSAGE=$(python3 -c "print('A' * 3000)")
curl -X POST "$BASE_URL/contact" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test User\",
    \"email\": \"test@example.com\",
    \"subject\": \"Long Message Test\",
    \"message\": \"$LONG_MESSAGE\"
  }" \
  -s | jq .
echo ""

# Test 7: Invalid JSON
echo "7. Testing invalid JSON..."
curl -X POST "$BASE_URL/contact" \
  -H "Content-Type: application/json" \
  -d '{invalid json}' \
  -s | jq .
echo ""

# Test 8: Check security headers
echo "8. Testing security headers..."
curl -I "$BASE_URL/contact" \
  -X OPTIONS \
  -H "Origin: http://localhost:3000" \
  -v
echo ""

echo "=== Security Test Suite Complete ==="