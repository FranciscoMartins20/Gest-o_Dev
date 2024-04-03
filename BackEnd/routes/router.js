const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');
const feriasRoutes = require('./ferias');

router.use('/', usersRoutes);
router.use('/ferias', feriasRoutes);

module.exports = router;
