# HR ERP System - Backend API

This is a mini HR ERP system module that allows:

- Admins to manage employee records (CRUD operations).
- Employees to view and update their profiles.
- Basic analytics on employee data, such as headcount by department.

## Table of Contents

- [Live url](#url)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Database Migrations](#database-migrations)
- [Run Test](#run-test)
- [API Documentation](#api-documentation)
- [Acknowledgement](#Acknowledgement)
- [Contributing](#contributing)
- [License](#license)

## Live url

`https://https://erp-system-njra.onrender.com/api/v1/`

- Please note that the Postgres Database hosted with render will become inactive a month after deployment.

## Features

- Admin can perform CRUD operations on employee records.
- Employee can view and update their profile (except salary and role).
- Basic analytics API to get the total number of employees and the number of employees in each department.
- Generate a default password for all registered employees (123456)

## Technology Stack

- **Backend:** Node.js with Express.js.
- **Database:** PostgreSQL with Prisma.
- **Hosting:** Render

## Project Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://yarnpkg.com/) (v1.x)
- [PostgreSQL](https://www.postgresql.org/) (Ensure the database is running and accessible)
- Ensure redis is running on your system or server.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LivingHopeDev/ERP-System.git
   cd ERP-System
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:
Check `.env.example ` file

```env
PORT=yourPortNumber
NODE_ENV=development
AUTH_SECRET=yourSecretKey
AUTH_EXPIRY=7d
DATABASE_URL=postgresql://postgres:yourDbPassword@yourhost:yourDbport/dbName


```

### Running the Application

#### Start the development server

```
yarn run start:dev

```

#### Default Admin login details

```json
{ "email": "admin@mail.com", "password": "123456" }
```

#### Access the application

The server will start on the specified PORT in your .env file. If PORT is set to 8000, the application will be available at <http://localhost:8070>.

#### Database Migrations

```
yarn prisma migrate dev
```

### Run Test

```
yarn test
```

### API Documentation

Visit the url below to view the documentation
live url
`https://https://erp-system-njra.onrender.com/api/docs/`
`localhost:8070/api/docs`

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Key Points

- The `README.md` provides a comprehensive guide on setting up the project locally, including installation instructions, environment variable configuration, and starting the server.
- Since the API documentation is not yet available, it includes a placeholder indicating that it will be provided later.
- The setup instructions are tailored specifically for a Node.js and PostgreSQL environment using Yarn.

This `README.md` file should serve as a solid foundation for your project documentation. Let me know if you need any changes or additional information!
