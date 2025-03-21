### trigger

```js
{
    "status": "success",
    "error": false,
    "message": "Ingestion started",
    "statusCode": 201,
    "data": {
        "status": "success",
        "message": "Ingestion started",
        "ingestionId": "30895ff0-38c9-4f21-a2f1-a7cba71029a7"
    }
}
```

### get status

```js
{
    "status": "success",
    "error": false,
    "message": "Request successful",
    "statusCode": 200,
    "data": {
        "ingestion": {
            "id": "c7d161f1-aae2-41b8-9dfd-9d9504af58e8",
            "documentId": 1,
            "status": "FAILED",
            "error": "Mock error during ingestion",
            "retries": 1,
            "createdAt": "2025-03-21T03:32:50.591Z",
            "updatedAt": "2025-03-21T03:32:53.727Z"
        }
    }
}
```