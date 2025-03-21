# 📘 Document Management & Ingestion Control API

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

### 📝 Folder Structure
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
│   ├── providers/
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

## 📊 Database Schema

### Document Table
| Column   | Type  |
|----------|-------|
| id       | int4  |
| title    | text  |
| url      | text  |
| userId   | text  |
| mineType | text  |
| size     | int4  |

### Users Table
| Column   | Type  |
|----------|-------|
| id       | text  |
| email    | text  |
| password | text  |
| role     | Role  |

### Ingestion Table
| Column    | Type              |
|-----------|------------------|
| id        | text              |
| documentId| int4              |
| status    | IngestionStatus   |
| error     | text              |
| retries   | int4              |
| createdAt | timestamp         |
| updatedAt | timestamp         |

---

## 🔐 Auth API

Base URL: `/api/v1/auth`

### 1️⃣ Register a New User
```http
POST /register
```
Refer to request/response above ⬆️

### 2️⃣ Login
```http
POST /login
```
Refer to request/response above ⬆️

---

## 👤 User API

Base URL: `/api/v1/user`

- `GET /` - Get all users (admin only)
- `GET /me` - Get current user (token required)
- `PATCH /:id/role` - Change user role (admin only)

Refer to response examples above ⬆️

---

## 📁 Document API

Base URL: `/api/v1/documents`

- `POST /upload` - Upload document (file, title, desc)
- `GET /` - Get all documents
- `GET /:id` - Get single document
- `PATCH /:id` - Update document (admin/editor)
- `DELETE /:id` - Delete document (admin/editor)

Refer to API responses above ⬆️

---

## ⚙️ Ingestion API

Base URL: `/api/v1/ingestion`

### 🔄 Trigger Ingestion
```http
POST /trigger
```
**Body:** `{ documentId: number }`

**Response:**
```json
{
  "status": "success",
  "message": "Ingestion started",
  "ingestionId": "uuid"
}
```

### 📊 Get Ingestion Status
```http
GET /status/:id
```
**Response:** Returns status + retries + errors (if any)

Refer to full response above ⬆️

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
GET /api/docs
```
Open in browser: `http://localhost:3000/api/docs`

Includes all:
- Auth APIs
- User APIs
- Document APIs
- Ingestion APIs

---

## ✨ Final Note
This project is a full-fledged backend system for document processing, built with real-world architecture patterns. It is ready for production extensions — including real Python integration, Redis, queues, etc.

Happy Building! 🚀

