# Advanced To Do List API

## Overview
The Advanced To Do List API is a robust and feature-rich API designed to manage tasks, categories, reminders, and users. It includes functionalities for creating, updating, and deleting tasks, categories, and reminders, as well as user management and email notifications for task reminders.

## Features
- User Authentication and Management
- Task Management (Create, Read, Update, Delete)
- Category Management (Create, Read, Update, Delete)
- Reminder Management (Create, Read, Update, Delete)
- Email Notifications for Task Reminders
- Secure API with JWT Authentication
- Input Validation with Joi
- Logging with Morgan
- Security Enhancements with Helmet and CORS

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- Node-cron
- Joi
- JWT
- Morgan
- Helmet
- CORS

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/advanced-to-do-list-api.git
    cd advanced-to-do-list-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    PORT=5000
    MONGODB=mongodb://localhost:27017/todo-list-api
    TOKEN=secretkey
    EMAIL=your-email@gmail.com
    PASSWORD=your-email-password
    ```

4. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### User Routes
- **Get all users**: `GET /api/users`
- **Get a user by ID**: `GET /api/users/:id`
- **Update a user**: `PUT /api/users/:id`
- **Delete a user**: `DELETE /api/users/:id`

### Task Routes
- **Create a new task**: `POST /api/task/create`
- **Get all tasks**: `GET /api/task`
- **Get a task by ID**: `GET /api/task/:id`
- **Update a task**: `PUT /api/task/:id`
- **Delete a task**: `DELETE /api/task/:id`

### Category Routes
- **Create a new category**: `POST /api/category/create`
- **Get all categories**: `GET /api/category`
- **Get a category by ID**: `GET /api/category/:id`
- **Update a category**: `PUT /api/category/:id`
- **Delete a category**: `DELETE /api/category/:id`

### Reminder Routes
- **Create a new reminder**: `POST /api/reminder/create`
- **Update a reminder**: `PUT /api/reminder/update/:id`

## Usage

### Creating a User
To create a user, send a `POST` request to `/api/user/register` with the following JSON body:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Creating a Category
To create a category, send a POST request to /api/category/create with the following JSON body:
```json
{
     "name" : "name of the category",
     "user" : "605c72ef8f1b2c0015b2b2b2"
}
```

### Creating a Task
To create a task, send a POST request to /api/task/create with the following JSON body:
```json
{
    "title": "Sample Task",
    "description": "This is a sample task description",
    "status": "pending",
    "dueDate": "2025-03-05T12:00:00.000Z",
    "userId": "605c72ef8f1b2c0015b2b2b2",
    "categoryId": "605c72ef8f1b2c0015b2b2b3"
}
```

### Creating a Reminder
To create a reminder, send a POST request to /api/reminder/create with the following JSON body:
```json
{
    "taskId": "605c72ef8f1b2c0015b2b2b2",
    "remindAt": "2025-03-05T12:00:00.000Z"
}
```
#### NOTE: This json body datas are only for showing/example purpose
### Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

### License
This project is licensed under the `MIT` License.

### Contact
For any questions or inquiries, please contact metasebiyawasfaw@gmail.com.

