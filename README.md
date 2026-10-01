# Task App

A small npm-workspaces monorepo with an Express API and a React client.

## Requirements

- Node.js 20 or newer
- MongoDB running locally, or a MongoDB connection URI

## Start developing

1. Install dependencies from the repository root with `npm install`.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` if needed.
3. Run `npm run dev` from the repository root.

The React app is available at http://localhost:5173 and the API at http://localhost:3000. The client displays API and MongoDB connection health.

## Workspace commands

- `npm run dev` starts the API and client together.
- `npm run build` builds the client for production.
- `npm start` starts the API.
