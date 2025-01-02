# HR ERP System - Backend API

This is a mini HR ERP system module that allows:

Admins to manage employee records (CRUD operations).
Employees to view and update their profiles.
Basic analytics on employee data, such as headcount by department.

# Features

- Admin can perform CRUD operations on employee records.
- Employee can view and update their profile (except salary and role).
- Basic analytics API to get the total number of employees and the number of employees in each department.

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
- [API Documentation](#api-documentation)
- [Acknowledgement](#Acknowledgement)
- [Contributing](#contributing)
- [License](#license)

## Live url

`https://library-management-system-api-8xi8.onrender.com/api/`

- Please note that the Postgres Database hosted with render will become inactive a month after deployment.

## Features

- User Registration & Authentication: Allows users to create accounts, log in, and manage their profiles.
- Book Browsing: Users can search for available books, view details like genre, description, and author.
- Borrowing Books: Users can borrow books if available, with due dates and borrowing limits.
- Renewing Books: Users can extend the borrowing period by renewing their books if there are available copies, they are within the borrow period and no reservations will be affected.
- Book Reservation: Users can reserve books if they are currently unavailable and they can add the date it is needed. Reserved books will be made available once returned.
- Account Management: Users can update their profiles and check their borrowing history.
- Admin Controls: Admins can manage book collections, users, fines.

## Technology Stack

- **Backend:** Node.js with Express.js, Redis for background job
- **Database:** PostgreSQL with Prisma
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
   git clone https://github.com/LivingHopeDev/library-management-system-API.git
   cd library-management-system-API
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

#### Access the application

The server will start on the specified PORT in your .env file. If PORT is set to 8000, the application will be available at <http://localhost:8070>.

#### Database Migrations

```
yarn prisma migrate dev
```

### API Documentation

Visit the url below to view the documentation
live url
`https://library-management-system-api-8xi8.onrender.com/api/docs/`
`localhost:8070/api/docs`

### Acknowledgement

- **Idea Source:** The idea for this Library Management System was inspired by Solomon Eseme, the founder of Mastering Backend. `https://app.masteringbackend.com/projects/build-your-own-library-management-system`

### Contributing

Contributions are welcome!

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Key Points

- The `README.md` provides a comprehensive guide on setting up the project locally, including installation instructions, environment variable configuration, and starting the server.
- Since the API documentation is not yet available, it includes a placeholder indicating that it will be provided later.
- The setup instructions are tailored specifically for a Node.js and PostgreSQL environment using Yarn.

This `README.md` file should serve as a solid foundation for your project documentation. Let me know if you need any changes or additional information!
