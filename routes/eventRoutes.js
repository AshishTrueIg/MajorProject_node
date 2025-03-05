import express from 'express';
import eventController from '../controllers/event.controller.js'
import validate from '../helpers/ajvValidator.js'
import createEventSchema from '../validators/eventValidator.js';
import createTicketSchema from '../validators/ticketValidator.js'

const router = express.Router();

router.get('/',eventController.getAllEvents);

router.get('/oneToMany',eventController.oneToMany);

router.get('/:id',eventController.getEventById);

router.post('/', validate(createEventSchema) ,eventController.createEvent);

router.put('/:id',validate(createEventSchema),eventController.updateEvent);

router.delete('/:id',eventController.deleteEvent);

router.post('/:id/tickets',validate(createTicketSchema),eventController.bookTicket);


export default router;