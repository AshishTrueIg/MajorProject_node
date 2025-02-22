const express = require('express');
const venueController = require('../controllers/venueController')
const validate = require('../utils/ajvValidator')
const createVenueSchema = require('../validators/venueValidator')

const router = express.Router();

router.get('/',venueController.getAllVenues);

router.get('/:id',venueController.getVenueById);

router.post('/', validate(createVenueSchema) ,venueController.createVenue);

router.put('/:id',validate(createVenueSchema),venueController.updateVenue);

router.delete('/:id',venueController.deleteVenue);


module.exports = router;