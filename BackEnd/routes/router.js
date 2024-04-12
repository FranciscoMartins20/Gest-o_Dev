const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');
const feriasRoutes = require('./ferias');
const ticketsRoutes = require('./ticket');

router.use('/', usersRoutes);
router.use('/ferias', feriasRoutes);
router.use('/ticket', ticketsRoutes);


module.exports = router;
