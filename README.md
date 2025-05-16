# 🚀 AlgoCode Evaluator Service

A scalable and asynchronous code evaluation service designed for competitive coding platforms. It supports multiple programming languages, uses BullMQ for queue-based job processing, and provides a RESTful API with admin monitoring via Bull-Board.

---

## 🏁 Quick Start

```bash
git clone <repo-url>
cd AlgoCode-Evaluator-Service
cp .env.example .env   # Configure environment variables
npm install
npm run dev
```

- Bull-Board UI: [http://localhost:8080/admin/queues](http://localhost:8080/admin/queues)
- API Base URL: [http://localhost:8080/api/v1](http://localhost:8080/api/v1)

---

## 📁 Project Structure

```
src/
├── bull_board/        → Bull-Board configuration
├── config/            → Server & Redis configuration
├── containers/        → Docker execution logic for code
├── controllers/       → Express controllers
├── dtos/              → Data transfer objects & Zod schemas
├── jobs/              → Job definitions for BullMQ
├── producers/         → Queue producers
├── queues/            → BullMQ queue instances
├── routes/            → Route definitions
├── types/             → TypeScript interfaces
├── utils/             → Helper functions & constants
├── validators/        → Request validation middleware
├── workers/           → BullMQ consumers (workers)
└── index.ts           → Application entry point
```

---

## ✨ Features

- **Multi-language Execution**: Supports Python, C++, Java via Docker containers
- **Job Queue System**: Uses BullMQ for managing submissions and workers
- **Fast REST API**: Built with Fastify for performance
- **Robust Validation**: Input validation using Zod
- **Admin Monitoring**: Bull-Board for tracking job queues and retries
- **Easily Extensible**: Add new languages or job types without hassle

---

## ⚙️ Environment Variables

| Variable     | Description      | Example     |
| ------------ | ---------------- | ----------- |
| `PORT`       | Application port | `8080`      |
| `REDIS_HOST` | Redis host       | `127.0.0.1` |
| `REDIS_PORT` | Redis port       | `6379`      |

---

## 📜 Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Starts dev server with hot reload |
| `npm run build` | Compiles TypeScript to `dist/`    |
| `npm start`     | Starts app using compiled code    |
| `npm run lint`  | Lints and auto-fixes code issues  |

---

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api/v1
```

---

### 📄 Endpoints

| Method | Endpoint       | Description                    |
| ------ | -------------- | ------------------------------ |
| GET    | `/`            | Health check (Ping controller) |
| POST   | `/submissions` | Submit code for evaluation     |

---

### 🔍 Detailed API Reference

<details>
<summary><strong>GET /</strong> — Health Check</summary>

#### Request

```http
GET /api/v1/
```

#### Response

```json
{
  "msg": "Ping controller is up"
}
```

</details>

---

<details>
<summary><strong>POST /submissions</strong> — Submit Code</summary>

#### Request

- **Content-Type:** `application/json`

#### Body Parameters

| Field     | Type   | Required | Description                     |
| --------- | ------ | -------- | ------------------------------- |
| userID    | string | Yes      | Unique ID of the user           |
| problemID | string | Yes      | Unique ID of the coding problem |
| code      | string | Yes      | Code to be submitted            |
| language  | string | Yes      | `python`, `cpp`, or `java`      |

##### Example

```json
{
  "userID": "user123",
  "problemID": "prob456",
  "code": "print(1+1)",
  "language": "python"
}
```

#### Success Response (201)

```json
{
  "success": true,
  "error": {},
  "message": "Successfully collected the subission",
  "data": {
    "userID": "user123",
    "problemID": "prob456",
    "code": "print(1+1)",
    "language": "python"
  }
}
```

#### Error Response (400)

```json
{
  "success": false,
  "message": "Invalid params received",
  "data": {},
  "error": {
     "Zod validation error details"
  }
}
```

</details>

---

## 🧑‍💻 Example Usage

```bash
curl -X POST http://localhost:8080/api/v1/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "userID": "user123",
    "problemID": "prob456",
    "code": "print(1+1)",
    "language": "python"
  }'
```

---

## 🛡️ Error Handling

All responses follow this structure:

```json
{
  "success": false,
  "message": "Error message",
  "data": {},
  "error": {
    /* error details */
  }
}
```

- `400` for validation issues
- `500` for internal server errors
- `201` for successful submissions

---

## 📊 Admin UI — Bull-Board

- Dashboard: [http://localhost:8080/admin/queues](http://localhost:8080/admin/queues)
- Monitor and manage jobs in queues (retry, remove, inspect)

---

## 🧩 Extending the Service

- **Add Language**: Implement in `src/containers/` and register in `ExecutorFactory`
- **Add Job Type**: Define job logic in `src/jobs/`, and register worker in `src/workers/`

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/fooBar`
3. Commit your changes: `git commit -am 'Add some fooBar'`
4. Push to the branch: `git push origin feature/fooBar`
5. Open a pull request

---

## 📬 Contact

For queries or bug reports, open an issue or contact the maintainer.
