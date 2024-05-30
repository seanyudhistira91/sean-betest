# sean-betest

A basic Express.js application.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/seanyudhistira91/sean-betest.gitgit
    cd sean-betest
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Set up MongoDB:

    - For a local MongoDB instance, ensure it is running.
    - For MongoDB Atlas, create a cluster and get the connection string.

4. Create a `.env` file in the root of your project and add your MongoDB connection string:

    ```env
    MONGODB_URI=your-mongodb-connection-string-here
    ```

## Running the Application

### Using npm

To start the application using npm, run:

```sh
npm start
```
### Using nodemon

 1. Install nodemon

```sh
npm install nodemon --save-dev
```
To start the application using npm:

```sh
npm run dev
```

### Using Docker

```sh
docker build -t ms-sean-betest .
docker run -p 3000:3000 ms-sean-betest
```

## Project Structure
sean-betest/
├── app.js
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
├── node_modules/
├── config/
│   └── db.js
    └── redisClient.js
├── routes/
│   └── index.js
├── controllers/
│   └── index.js
├── models/
│   └── User.js
└── README.md

## File Descriptions

1. app.js: The main application file.
2. Dockerfile: Instructions to build the Docker image.
3. .dockerignore: Specifies which files and directories to ignore in the Docker build context.
4. package.json: Project metadata and dependencies.
5. package-lock.json: Ensures consistent dependency installs.
6. routes/index.js: Defines application routes.
7. controllers/indexController.js: Handles the logic for the routes.
8. config/db.js: MongoDB connection configuration.
9. config/redisClient.js: Redis connection configuration.
10. models/User.js: Defines the User schema and model.