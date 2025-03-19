# login

## success
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
    "email": "Editor",
    "password" "",
}

```
```js
{
    "status": "success",
    "error": false,
    "message": "Login successful",
    "statusCode": 201,
    "data": {
        "user": {
            "id": "65b4965a-7869-4db8-a953-c5919839a48b",
            "email": "zehan9211@gmail.com",
            "password": "$2b$08$BNSXrTK/PyNRO8J2eEpp0eVqhbJ/RdtqHO88x0tgF9EPqlAtcZUOq",
            "role": "ADMIN"
        },
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplaGFuOTIxMUBnbWFpbC5jb20iLCJpYXQiOjE3NDI0MjE3OTIsImV4cCI6MTc0MjQyNTM5Mn0.r7OLPDpNOJUsEG3o-euMjUxJ4a3UQT9vnN8T7oc4v-s"
    }
}
```

## error

```js
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

## incorrect

```js
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

## add invalid propery
```js
{
    "status": "error",
    "error": true,
    "message": "Input Validation Error",
    "statusCode": 400,
    "errors": {
        "code": 400,
        "details": "username: property username should not exist"
    }
}
```

# Register User

```bash
{
    "status": "success",
    "error": false,
    "message": "Registered successful",
    "statusCode": 201,
    "data": {
        "user": {
            "id": "b901cc0b-bc65-4e9f-928a-248d532f6842",
            "email": "newUser@gmail.com",
            "password": "$2b$10$0vbHSsrwxyFAMgYlGom1e.yIiYUwsV9w9BLJRYzdU/nNePnxZL/ES",
            "role": "VIEWER"
        }
    }
}
```

### already present
```bash
{
    "status": "error",
    "error": true,
    "message": "User already exist",
    "statusCode": 409,
    "errors": {
        "code": 409,
        "details": "user already in the database"
    }
}
```

## validation error
```js
{
    "status": "error",
    "error": true,
    "message": "Input Validation Error",
    "statusCode": 400,
    "errors": {
        "code": 400,
        "details": "password: Password must be at least 6 characters long, Password is required"
    }
}
```

