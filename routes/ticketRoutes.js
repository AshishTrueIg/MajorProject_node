const express = require('express');
const ticketController = require('../controllers/ticket.controller')

const router = express.Router();

router.get('/',ticketController.getAllTickets);

router.get('/user/:id',ticketController.getUserTickets);

router.delete('/:id',ticketController.cancelTicket);

router.get('/oneToMany',ticketController.onetomany)

module.exports = router;