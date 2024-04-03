const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const usersController = require('../controller/usersController');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', function(req, res) {
    usersController.registrarUtilizador(req, res);
});

router.post('/login', function(req, res) {
    usersController.fazerLogin(req, res);
});

router.post('/logout', usersController.logout);



module.exports = router;
