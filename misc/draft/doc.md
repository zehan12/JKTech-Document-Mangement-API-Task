## upload

## success

```js
{
    "status": "success",
    "error": false,
    "message": "File upload successfully",
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

# not found
```js
{
  "message": "File not found",
  "statusCode": 404,
  "error": {
    "code": 404,
    "details": "Upload file not detected"
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