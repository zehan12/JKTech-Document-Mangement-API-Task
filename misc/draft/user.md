# update user role success

### api/v1/user/:id/role
patch

```js
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

# error

### wrong role
```js
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

### worng user id

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

### aciton without jwt login token
```js
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

### wrong role user action
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


# Me Api
### api/v1/user/me

### success
```js
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

### error
```js
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

# Get All Users
only access Admin

### api/v1/user

## success
```js
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
            },
            {
                "id": "b901cc0b-bc65-4e9f-928a-248d532f6842",
                "email": "newUser@gmail.com",
                "role": "VIEWER"
            },
            {
                "id": "fbec0a3d-26f8-441d-8b08-cd477ce0194d",
                "email": "zehan@gmail.com",
                "role": "EDITOR"
            }
        ]
    }
}
```

## error not jwt 
```js
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

## error not admin role
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




