// external module
const express = require('express');
const hostRouter = express.Router();

// local modules
const homeController = require('../controllers/hostController');

hostRouter.get('/add-home' , homeController.getAddHome);
hostRouter.post('/add-home', homeController.postAddHome);

hostRouter.get('/host-home-list', homeController.hosthomelist);

hostRouter.get('/edit-home/:homeid', homeController.getEditHome);
hostRouter.post('/edit-home', homeController.postEditHome);

hostRouter.post('/delete-home', homeController.postDeleteHome);

exports.hostRouter = hostRouter;
