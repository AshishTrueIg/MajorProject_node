import express from 'express';
import ticketController from '../controllers/ticket.controller.js'

const router = express.Router();

router.get('/',ticketController.getAllTickets);

router.get('/oneToMany',ticketController.onetomany)

router.get('/user/:id',ticketController.getUserTickets);

router.delete('/:id',ticketController.cancelTicket);


export default router;