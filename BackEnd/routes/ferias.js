const express = require('express');
const router = express.Router();
const feriasController = require('../controller/feriasController');
const verificarToken = require('../middleware/verifyToken');

router.post('/addferias', verificarToken, function(req, res) {
    feriasController.adicionarFerias(req, res);
});


module.exports = router;
