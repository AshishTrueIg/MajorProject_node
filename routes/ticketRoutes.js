const express = require('express');
const ticketController = require('../controllers/ticketController')

const router = express.Router();

router.get('/',ticketController.getAllTickets);

router.get('/user/:id',ticketController.getUserTickets);

router.delete('/:id',ticketController.cancelTicket);

module.exports = router;