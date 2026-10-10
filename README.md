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

## How to Use After Cloning

Clone the repository:

```bash
git clone https://github.com/Dippu-yadav/Airbnb.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root folder. This file is not uploaded to GitHub, so every user must create it manually after cloning:

```bash
touch .env
```

Open `.env` and add your MongoDB connection URI:

```env
url=your_mongodb_connection_string
```

If you are using MongoDB locally, use:

```env
url=mongodb://127.0.0.1:27017/airbnb
```

If you are using MongoDB Atlas, use your Atlas connection string:

```env
url=mongodb+srv://<username>:<password>@<cluster-url>/airbnb
```

Replace `<username>`, `<password>`, and `<cluster-url>` with your own MongoDB Atlas details.

Start the project:

```bash
npm start
```

Open the app in your browser:

```txt
http://localhost:4000
```

## Full Terminal Commands

Run these commands one by one:

```bash
git clone https://github.com/Dippu-yadav/Airbnb.git
```

```bash
cd 15fileupload
```

```bash
npm install
```

```bash
touch .env
```

Then add this inside `.env`:

```env
url=mongodb://127.0.0.1:27017/airbnb
```

Or, for MongoDB Atlas:

```env
url=mongodb+srv://<username>:<password>@<cluster-url>/airbnb
```

Finally, start the server:

```bash
npm start
```

The app will run at:

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
