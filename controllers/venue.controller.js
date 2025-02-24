const db = require('../models/index')
const Venue = db.Venue;
const Event = db.Event;

const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.findAll();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVenue = async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json(venue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id,{include:Event});
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVenue = async (req, res) => {
  try {
    const [updated] = await Venue.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Venue not found' });
    res.json({ message: 'Venue updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const deleted = await Venue.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Venue not found' });
    res.json({ message: 'Venue deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const oneToMany = async (req,res)=>{
  try {
    const venues = await Venue.findAll({include:Event});
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    getAllVenues,
    createVenue,
    getVenueById,
    updateVenue,
    deleteVenue,
    oneToMany
}