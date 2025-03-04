import db from '../db/models/index.js'
const Event = db.Event;
const Ticket= db.Ticket;
const Venue = db.Venue;
const sequelize = db.sequelize

let currentPage =1;
const getAllEvents = async (req, res) => {
  try {
    const size =3;
    const totalEvents= await Event.count();
    const totalPage = Math.ceil(totalEvents/size);
    const offset = (currentPage-1)*size;

    const events = await Event.findAll({
      limit:size,
      offset:offset
    });
    res.json({
      currentPage,
      totalPage,
      data:events
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {title, description, date, status, venueId } =req.body;
    const event = await Event.create({
      title, 
      description, 
      date, 
      status, 
      venueId
    },
    {transaction}
  );
    await transaction.commit();
    res.status(201).json(event);
  } catch (error) {
    await transaction.rollback();
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
  const transaction = await sequelize.transaction();
  try {
    const [updated] = await Event.update(req.body, { where: { id: req.params.id } },
      {transaction}
    );
    if (!updated) return res.status(404).json({ error: 'Event not found' });

    await transaction.commit();
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const deleted = await Event.destroy({ where: { id: req.params.id } },
      {transaction}
    );
    if (!deleted) return res.status(404).json({ error: 'Event not found' });
    
    await transaction.commit();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {

    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

const bookTicket = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const ticket = await Ticket.create({ eventId: req.params.id, ...req.body },
      {transaction}
    );

    await transaction.commit();
    res.status(201).json(ticket);
  } catch (error) {

    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

const oneToMany = async (req,res)=>{
  try {
    const events = await Event.findAll({
      include:[
        {model: Venue , as: 'venues'},
        {model: Ticket , as: 'tickets'}
      ]
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent,
    bookTicket,
    oneToMany
}