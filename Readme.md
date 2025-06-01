# Node.js Login Application with Forgot Password Functionality

This is a simple Node.js login application with forgot password functionality. The application uses MongoDB as the database and Express.js as the web framework. The application also uses JSON Web Tokens (JWT) for authentication.

## Features

- User registration
- User login
- Forgot password functionality
- Password reset functionality

## Installation

1. Clone the repository
2. Install the dependencies using `npm install`
3. Create a `.env` file with the following variables:
	* `PORT`: The port number to run the application on
	* `MONGODB_URI`: The MongoDB connection URI
	* `JWT_SECRET`: The secret key to use for generating JWT
	* `PASS_KEY`: The password to use for sending emails
	* `PASS_MAIL`: The email address to use for sending emails
4. Run the application using `npm start`

## Base Route
- `/api/auth`: base Route

## Routes

- `/register`: Register a new user
- `/login`: Login a user
- `/forgot-password`: Forgot password functionality
- `/reset-password/:id/:token`: Reset password functionality

## Endpoints

- `POST /register`: Register a new user
- `POST /login`: Login a user
- `POST /forgot-password`: Forgot password functionality
- `POST /reset-password/:id/:token`: Reset password functionality

## Request Body

- `name`: The name of the user
- `email`: The email address of the user
- `password`: The password of the user

## Response

- `message`: The response message
- `data`: The response data
- `token`: The JWT token

## Environment Variables

- `PORT`: The port number to run the application on
- `MONGODB_URI`: The MongoDB connection URI
- `JWT_SECRET`: The secret key to use for generating JWT
- `PASS_KEY`: The password to use for sending emails
- `PASS_MAIL`: The email address to use for sending emails

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Nodemailer
