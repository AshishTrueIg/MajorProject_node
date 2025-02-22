const express = require('express');
const eventController = require('../controllers/eventController')
const validate = require('../utils/ajvValidator')
const createEventSchema = require('../validators/eventValidator')
const {createTicketSchema} = require('../validators/ticketValidator');

const router = express.Router();

router.get('/',eventController.getAllEvents);

router.get('/:id',eventController.getEventById);

router.post('/', validate(createEventSchema) ,eventController.createEvent);

router.put('/:id',validate(createEventSchema),eventController.updateEvent);

router.delete('/:id',eventController.deleteEvent);

router.post('/:id/tickets',validate(createTicketSchema),eventController.bookTicket);

module.exports = router;