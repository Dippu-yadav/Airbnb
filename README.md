# File Upload Airbnb App

A Node.js and Express web application inspired by Airbnb. Users can sign up, log in, view homes, add favourites, and hosts can add, edit, delete, and upload images for home listings.

## Features

- User signup and login
- Password hashing with bcrypt
- Session-based authentication
- Host-protected routes
- Add, edit, and delete home listings
- Upload home images using Multer
- View home details
- Add and remove favourite homes
- MongoDB database with Mongoose
- EJS templating
- Tailwind CSS styling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Multer
- Express Session
- connect-mongodb-session
- bcryptjs
- Tailwind CSS

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd 15fileupload
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root folder:

```env
url=your_mongodb_connection_string
```

Example:

```env
url=mongodb://127.0.0.1:27017/airbnb
```

Start the project:

```bash
npm start
```

Open the app in your browser:

```txt
http://localhost:4000
```

## Project Structure

```txt
15fileupload/
├── app.js
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── uploads/
├── utils/
├── package.json
└── nodemon.json
```

## Main Routes

### Auth Routes

```txt
GET  /login
POST /login
GET  /signup
POST /signup
POST /logout
```

### Store Routes

```txt
GET  /
GET  /home-list
GET  /home/:homeid
GET  /favourites
POST /favourites
POST /favourites/delete/:homeid
GET  /bookings
```

### Host Routes

```txt
GET  /host/add-home
POST /host/add-home
GET  /host/host-home-list
GET  /host/edit-home/:homeid
POST /host/edit-home
POST /host/delete-home
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `url` | MongoDB connection string |

## Notes Before Uploading to GitHub

Make sure your `.env` file is not uploaded because it contains your database connection string.

Your `.gitignore` already ignores:

```txt
.env
.env.*
node_modules/
npm-debug.log*
```

If you do not want uploaded test images in GitHub, also ignore:

```txt
uploads/
```

## Author

Created by Sahab.
