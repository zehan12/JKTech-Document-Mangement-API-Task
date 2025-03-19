# USER API 

## Base URL
```bash
/api/v1/user
```

---

## Endpoints and Responses

### **1️⃣ Get all Users ( Admin Only )**
**Endpoint:**
```bash
GET /api/v1/user
```

**Request:**
```bash
GET /api/v1/user
Authorization: Bearer <access_token>
```

**Success Response:**
```json
{
    "status": "success",
    "error": false,
    "message": "Fetched all Users",
    "statusCode": 200,
    "data": {
        "users": [
            {
                "id": "d9437e1c-e8f4-4b6e-a7bf-c5fd4b3cf252",
                "email": "z@gmail.com",
                "role": "VIEWER"
            },
            {
                "id": "65b4965a-7869-4db8-a953-c5919839a48b",
                "email": "zehan9211@gmail.com",
                "role": "ADMIN"
            }
        ]
    }
}

```

**Error Responses:**
- **Invalid Role:**
```json
{
    "status": "error",
    "error": true,
    "message": "You do not have permission to perform this action",
    "statusCode": 403,
    "errors": {
        "code": 403,
        "details": "Forbidden"
    }
}
```

- **Token Missing Error:**
```json
{
    "status": "error",
    "error": true,
    "message": "Unauthorized",
    "statusCode": 401,
    "errors": {
        "code": 401,
        "details": "You do not have access, jwt must be provide"
    }
}
```

---

### **2️⃣ Get current user ( Token Require )**
**Endpoint:**
```bash
GET /api/v1/user/me
```

**Request:**
```bash
GET /api/v1/user
Authorization: Bearer <access_token>
```

**Success Response:**
```json
{
    "status": "success",
    "error": false,
    "message": "Fetched user successful",
    "statusCode": 200,
    "data": {
        "user": {
            "id": "fbec0a3d-26f8-441d-8b08-cd477ce0194d",
            "email": "zehan@gmail.com",
            "role": "EDITOR"
        }
    }
}
```

**Error Responses:**
- **Token Missing:**
```json
{
    "status": "error",
    "error": true,
    "message": "Unauthorized",
    "statusCode": 401,
    "errors": {
        "code": 401,
        "details": "You do not have access, jwt must be provide"
    }
}
```

### **3️⃣  Change user role ( Admin Only )**
**Endpoint:**
```bash
PATCH /api/v1/user/:id/role
```

**Request:**
```bash
PATCH /api/v1/user/d9437e1c-e8f4-4b6e-a7bf-c5fd4b3cf252/role
Authorization: Bearer <access_token>

{
  "role":"ADMIN"
}
```

**Success Response:**
```json
{
    "status": "success",
    "error": false,
    "message": "User role updated successfully",
    "statusCode": 200,
    "data": {
        "message": "User role updated successfully",
        "user": {
            "id": "fbec0a3d-26f8-441d-8b08-cd477ce0194d",
            "email": "zehan@gmail.com",
            "password": "$2b$10$BzrBEP8SwHQIyV4Sg2IvHOrkfZgtxKQl.077J84CrC23hhFExEaX.",
            "role": "EDITOR"
        }
    }
}
```

**Error Responses:**

- **Invalid Role:**
```js
{
    "status": "error",
    "error": true,
    "message": "You do not have permission to perform this action",
    "statusCode": 403,
    "errors": {
        "code": 403,
        "details": "Forbidden"
    }
}
```

- **Invalid Input:**
```json
{
    "status": "error",
    "error": true,
    "message": "Input Validation Error",
    "statusCode": 400,
    "errors": {
        "code": 400,
        "details": "Role not found"
    }
}
```

- **User Not Found:**
```js
{
    "status": "error",
    "error": true,
    "message": "User not found",
    "statusCode": 404,
    "errors": {
        "code": 404,
        "details": "Invalid user id or user does not exist"
    }
}
```


- **Token Missing:**
```json
{
    "status": "error",
    "error": true,
    "message": "Unauthorized",
    "statusCode": 401,
    "errors": {
        "code": 401,
        "details": "You do not have access, jwt must be provide"
    }
}
```
