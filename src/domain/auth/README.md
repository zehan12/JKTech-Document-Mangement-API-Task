# AUTH API 

## Base URL
```bash
/api/v1/auth
```

---

## Endpoints and Responses

### **1️⃣ Register a New User**
**Endpoint:**
```bash
POST /api/v1/auth/register
```

**Request:**
```json
{
  "email": "zehan@gmail.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "status": "success",
  "error": false,
  "message": "Registered successful",
  "statusCode": 201,
  "data": {
    "user": {
      "id": "b901cc0b-bc65-4e9f-928a-248d532f6842",
      "email": "zehan@gmail.com",
      "role": "VIEWER"
    }
  }
}
```

**Error Responses:**
- **User already exists:**
```json
{
  "status": "error",
  "error": true,
  "message": "User already exists",
  "statusCode": 409,
  "errors": {
    "code": 409,
    "details": "User already in the database"
  }
}
```

- **Validation Error:**
```json
{
  "status": "error",
  "error": true,
  "message": "Input Validation Error",
  "statusCode": 400,
  "errors": {
    "code": 400,
    "details": "password: Password must be at least 6 characters long"
  }
}
```

---

### **2️⃣ User Login**
**Endpoint:**
```bash
POST /api/v1/auth/login
```

**Request:**
```json
{
  "email": "zehan9211@gmail.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "status": "success",
  "error": false,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "user": {
      "id": "65b4965a-7869-4db8-a953-c5919839a48b",
      "email": "zehan9211@gmail.com",
      "role": "ADMIN"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- **Incorrect Credentials:**
```json
{
  "status": "error",
  "error": true,
  "message": "Incorrect Password or email",
  "statusCode": 401,
  "errors": {
    "code": 401,
    "details": "Invalid credentials"
  }
}
```

- **User Not Found:**
```json
{
  "status": "error",
  "error": true,
  "message": "User not found",
  "statusCode": 404,
  "errors": {
    "code": 404,
    "details": "Invalid email or user does not exist"
  }
}
```

- **Validation Error:**
```json
{
  "status": "error",
  "error": true,
  "message": "Input Validation Error",
  "statusCode": 400,
  "errors": {
    "code": 400,
    "details": "email: Invalid email format"
  }
}
```
