const express = require('express');
const router = express.Router();
const feriasController = require('../controller/feriasController');

router.post('/addferias', function(req, res) {
    feriasController.adicionarFerias(req, res);
});


module.exports = router;
