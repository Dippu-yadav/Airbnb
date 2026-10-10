// external module
const express = require('express');
const storeRouter = express.Router();
// local module
const storeController = require('../controllers/storeController');

storeRouter.get('/', storeController.index);
storeRouter.get('/bookings', storeController.bookings);
storeRouter.get('/home-list', storeController.homeList);
storeRouter.get('/favourites', storeController.getFavourites);
storeRouter.post('/favourites', storeController.postFavourites);
storeRouter.post('/favourites/delete/:homeid', storeController.postFavouritesDelete);
storeRouter.get('/home/:homeid', storeController.homeDetailPage);

module.exports = storeRouter;