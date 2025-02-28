import express from 'express';
import venueController from '../controllers/venue.controller.js';
import validate from '../utils/ajvValidator.js';
import createVenueSchema from '../validators/venueValidator.js'

const router = express.Router();

router.get('/',venueController.getAllVenues);

router.get('/oneToMany',venueController.oneToMany)

router.get('/:id',venueController.getVenueById);

router.post('/', validate(createVenueSchema) ,venueController.createVenue);

router.put('/:id',validate(createVenueSchema),venueController.updateVenue);

router.delete('/:id',venueController.deleteVenue);

export default router;