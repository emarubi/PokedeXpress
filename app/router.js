const express = require('express');

const router = express.Router();


const mainController = require('./controllers/mainController');

router.get('/', mainController.home);

router.get('/pokemon/:id', mainController.pokemonDetail);

router.get('/types', mainController.types);

router.get('/type/:id', mainController.pokemonTypes);


module.exports = router;