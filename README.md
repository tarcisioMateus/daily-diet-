# Daily Diet API

The Daily Diet API is a RESTful API built with Node.js, TypeScript, and Fastify. 
It allows users to create an account, log in, and register their meals, specifying whether they are on or off their diet. 
Users can also retrieve metrics about their meals. 
The project uses Knex.js as a query builder, supports both PostgreSQL (production) and SQLite (development/testing), and includes E2E (End-to-End) and integration tests powered by Vitest. 
The API is deployed and running on Render: [Daily Diet API](https://daily-diet-1.onrender.com).
## Run

to install all dependencies and start the application.
```bash
  npm install && npm run knex -- migrate:latest && npm run build
  node build/server.cjs
```

## Deployment link 
[Daily Diet API](https://daily-diet-1.onrender.com)

## Tech Stack
**Backend**: Node.js, TypeScript, Fastify

**Database**: PostgreSQL, SQLite

**ORM/Query Builder**: Knex.js

**Testing**: Vitest (E2E and integration tests)

**Process Manager**: PM2

**Deployment**: Render

## Usage / Insomnia Collaction

To make it easier to test the API, an Insomnia collection is provided. Import the Insomnia.json file into your Insomnia app to quickly access all the routes.
Download the Insomnia.json file from the repository.

Open Insomnia and click Import/Export > Import Data > From File.
Select the Insomnia.json file.

## Links
[![github](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tarcisiomateus)

