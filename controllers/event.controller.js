const db = require('../models/index')
const Event = db.Event;
const Ticket= db.Ticket;
const Venue = db.Venue;

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const [updated] = await Event.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bookTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({ eventId: req.params.id, ...req.body });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const oneToMany = async (req,res)=>{
  try {
    const events = await Event.findAll({
      include: [Venue,Ticket]
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent,
    bookTicket,
    oneToMany
}