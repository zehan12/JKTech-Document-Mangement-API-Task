# 📘 Document Management API

## 🚀 Project Setup

### 📦 Tech Stack
- NestJS (TypeScript)
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Cloudinary for document upload
- Swagger (OpenAPI) for documentation
- **Package Manager:** pnpm

---

### 📁 GitHub & Hosted URLs
- GitHub: [https://github.com/zehan12/JKTech-Document-Mangement-API-Task](https://github.com/zehan12/JKTech-Document-Mangement-API-Task)
- Hosted API: [https://docsmgtapi.onrender.com](https://docsmgtapi.onrender.com)

### ⚙️ Required `.env` Configuration
Copy `.env.example` and create your own `.env` file:

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 🔧 Installation

#### **Prerequisites**
- Node.js (v16 or higher)
- pnpm (preferred package manager)
- PostgreSQL database
- Git

#### **Steps**

1. Clone the repository:
```bash
git clone https://github.com/zehan12/JKTech-Document-Mangement-API-Task
```
2. Navigate to the project directory:
```bash
cd JKTech-Document-Mangement-API-Task
```
3. Install dependencies:
```bash
pnpm install
```
4. Generate Prisma client:
```bash
npx prisma generate
```
5. Apply database migrations:
```bash
npx prisma migrate dev --name init
```
6. Create `.env` file and configure variables as per `.env.example`.
7. Start the application:
```bash
pnpm run start:dev
```

The application will be available at `http://localhost:3000`.

---



## 📊 Database Schema

[![Screenshot-from-2025-03-21-10-06-14.png](https://i.postimg.cc/44vD4P4N/Screenshot-from-2025-03-21-10-06-14.png)](https://postimg.cc/grJSNv6f)

---

## 🔐 Auth API

Base URL: `/api/v1/auth`

### 1️⃣ Register a New User
```http
POST /register
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

### 2️⃣ Login
```http
POST /login
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

---

## 👤 User API

Base URL: `/api/v1/user`

- `GET /` - Get all users (admin only)
- `GET /me` - Get current user (token required)
- `PATCH /:id/role` - Change user role (admin only)

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


---

## 📁 Document API

Base URL: `/api/v1/documents`

- `POST /upload` - Upload document (file, title, desc)
- `GET /` - Get all documents
- `GET /:id` - Get single document
- `PATCH /:id` - Update document (admin/editor)
- `DELETE /:id` - Delete document (admin/editor)

---

### Endpoints and Responses

### **📤 Upload Document**
**Endpoint:**
```bash
POST /api/v1/documents/upload
```

**Success Response:**
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
            "url": "https://res.cloudinary.com/...",
            "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
        }
    }
}
```

**Error Responses:**
- **Unauthorized:**
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

- **Not Found:**
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

- **Internal Server Error:**
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

---

### **📥 Get All Documents**
**Endpoint:**
```bash
GET /api/v1/documents
```

**Success Response:**
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
                "url": "https://res.cloudinary.com/...",
                "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
            }
        ]
    }
}
```

**Error Responses:**
- **Unauthorized:**
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

- **Internal Server Error:**
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

---

### **📄 Get Single Document**
**Endpoint:**
```bash
GET /api/v1/documents/:id
```

**Success Response:**
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
            "url": "https://res.cloudinary.com/...",
            "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
        }
    }
}
```

**Error Responses:**
- **Unauthorized:**
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

- **Internal Server Error:**
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

---

### **✏️ Update Document** (Admin/Editor)
**Endpoint:**
```bash
PATCH /api/v1/documents/:id
```

**Success Response:**
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
            "url": "https://res.cloudinary.com/...",
            "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
        }
    }
}
```

**Error Responses:**
- **Invalid ID:**
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

- **Forbidden:**
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

- **Unauthorized:**
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

- **Internal Server Error:**
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

---

### **🗑️ Delete Document** (Admin/Editor)
**Endpoint:**
```bash
DELETE /api/v1/documents/:id
```

**Success Response:**
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
            "url": "https://res.cloudinary.com/...",
            "userId": "89e7f7d4-aa8a-4bf4-8a18-1ff932d95e0d"
        }
    }
}
```

**Error Responses:**
- **Invalid ID:**
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

- **Forbidden:**
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

- **Unauthorized:**
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

- **Internal Server Error:**
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



---

## ⚙️ Ingestion API

#### Endpoints and Responses

### ▶️ Trigger Ingestion
**Endpoint:**
```bash
POST /api/v1/ingestion/trigger
```

**Success Response:**
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

---

### 🔎 Get Ingestion Status
**Endpoint:**
```bash
GET /api/v1/ingestion/:id/status
```

**Success Response:**
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



---

## 🥪 Testing
- `unit tests`: Services + Controllers (Jest)
- `integration tests`: Coming soon

Run tests:
```bash
pnpm test
```

---

## 📘 Swagger Docs
```http
GET /
```
Open in browser: `http://localhost:3000/`

[![Screenshot-from-2025-03-21-10-25-07.png](https://i.postimg.cc/sgb64GfN/Screenshot-from-2025-03-21-10-25-07.png)](https://postimg.cc/tstNXTx3)
[![Screenshot-from-2025-03-21-10-25-59.png](https://i.postimg.cc/W3w5V9GB/Screenshot-from-2025-03-21-10-25-59.png)](https://postimg.cc/hzhLb13s)
[![Screenshot-from-2025-03-21-10-28-32.png](https://i.postimg.cc/FRpV8Ymm/Screenshot-from-2025-03-21-10-28-32.png)](https://postimg.cc/0M6SJ2bH)

Includes all:
- Auth APIs
- User APIs
- Document APIs
- Ingestion APIs

---

## Load Testing

### Install
```
sudo apt install apache2-utils                               
```

### Run Load Testing on Login
```bash
pnpm run loadtesting
```


## 📝 Folder Structure
```
JKTech-Document-Mangement-API-Task
│── dist/
│── misc/
│── node_modules/
│── prisma/
│── src/
│   ├── core/
│   │   ├── config/
│   │   ├── decorators/
│   │   ├── enums/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   ├── strategies/
│   ├── domain/
│   │   ├── auth/
│   │   ├── documents/
│   │   ├── health/
│   │   ├── ingestion/
│   │   ├── user/
│   ├── external/
|   |   ├── mock-python.service.ts
│   ├── providers/
|   |   ├── cloudinary/
|   |   ├── prisma/
│   ├── app.module.ts
│   ├── main.ts
│── test/
│── uploads/
│── .env
│── .env.example
│── .gitignore
│── .prettierrc
│── eslint.config.mjs
│── nest-cli.json
│── package.json
│── pnpm-lock.yaml
```

---
## Author
<a href="https://github.com/zehan12">
<img src="https://avatars.githubusercontent.com/u/73664886?s=400&u=b4640ee6fcf6bdb55f455d2b1ec8d91a330f9b04&v=4" width="100px;" alt="Zehan Khan"/><br />
<sub><b>Zehan Khan</b></sub>
</a><br />
<a href="https://github.com/zehan12/rekise_marine_frontend_task/commits?author=zehan12" title="Code">💻</a>

---


Happy Building! 🚀

