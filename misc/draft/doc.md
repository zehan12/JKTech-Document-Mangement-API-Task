## upload
api/v1/documents/upload

## success

```js
{
    "status": "success",
    "error": false,
    "message": "Document upload successfully",
    "statusCode": 201,
    "data": {
        "document": {
            "id": 2,
            "title": "zehan_khan_fullstack_2025.pdf",
            "url": "https://res.cloudinary.com/dxbez8ikp/raw/upload/v1742507626/adz3x5pwjtyxbpcjskzi",
            "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
        }
    }
}
```

# unauthorized
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

# not found
```js
{
  "message": "Document not found",
  "statusCode": 404,
  "error": {
    "code": 404,
    "details": "Upload document not detected"
  }
}
```     

# server error
```js
{
  "message": "Something went wrong",
  "statusCode": 500,
  "error": {
    "code": 500,
    "details": "Unexpected error occurred"
  }
}
```


### get all documents
api/v1/documents/

## success
```js
{
    "status": "success",
    "error": false,
    "message": "Fetch All Documents",
    "statusCode": 200,
    "data": {
        "documents": [
            {
                "id": 1,
                "title": "zehan_khan_fullstack_2025.pdf",
                "url": "https://res.cloudinary.com/dxbez8ikp/raw/upload/v1742507402/iqghiot7ppu6yfjim6h6",
                "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
            },
        ]
    }
}
```

## unauthozied
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

## internal server error
```js
{
  "message": "Something went wrong",
  "statusCode": 500,
  "error": {
    "code": 500,
    "details": "Unexpected error occurred"
  }
}
```




## Fetch Single Document
/api/v1/documents/:id

## success
```js
{
    "status": "success",
    "error": false,
    "message": "Fetch document",
    "statusCode": 200,
    "data": {
        "document": {
            "id": 1,
            "title": "zehan_khan_fullstack_2025.pdf",
            "url": "https://res.cloudinary.com/dxbez8ikp/raw/upload/v1742507402/iqghiot7ppu6yfjim6h6",
            "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
        }
    }
}
```


## error
### unauthozied
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

### internal server error
```js
{
  "message": "Something went wrong",
  "statusCode": 500,
  "error": {
    "code": 500,
    "details": "Unexpected error occurred"
  }
}
```

### upadate doc by ( admin, editor  )
patch /api/v1/document/:id

### success
```js
{
    "status": "success",
    "error": false,
    "message": "Update document successfully",
    "statusCode": 200,
    "data": {
        "document": {
            "id": 1,
            "title": "new title",
            "url": "https://res.cloudinary.com/dxbez8ikp/raw/upload/v1742507402/iqghiot7ppu6yfjim6h6",
            "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
        }
    }
}
```

### wrong id 
```js
{
    "status": "error",
    "error": true,
    "message": "Document not found",
    "statusCode": 404,
    "errors": {
        "code": 404,
        "details": "Invalid document id or document does not exist"
    }
}
```

### role based error
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

### unauthozied
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

### internal server error
```js
{
  "message": "Something went wrong",
  "statusCode": 500,
  "error": {
    "code": 500,
    "details": "Unexpected error occurred"
  }
}
```

## delete Document by admin
delte api/v1/documents/:

### success
```js
{
    "status": "success",
    "error": false,
    "message": "Document deleted successfully",
    "statusCode": 200,
    "data": {
        "document": {
            "id": 10,
            "title": "zehan_khan_fullstack_2025.pdf",
            "url": "https://res.cloudinary.com/dxbez8ikp/raw/upload/v1742520207/yphusdxnqt1nbdpjya0u",
            "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
        }
    }
}
```

## error

### wrong id 
```js
{
    "status": "error",
    "error": true,
    "message": "Document not found",
    "statusCode": 404,
    "errors": {
        "code": 404,
        "details": "Invalid document id or document does not exist"
    }
}
```

### role based error
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

### unauthozied
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

### internal server error
```js
{
  "message": "Something went wrong",
  "statusCode": 500,
  "error": {
    "code": 500,
    "details": "Unexpected error occurred"
  }
}
```