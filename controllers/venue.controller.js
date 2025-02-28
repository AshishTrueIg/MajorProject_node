import db from '../db/models/index.js'
const Venue = db.Venue;
const Event = db.Event;
const sequelize = db.sequelize;

let currentPage = 1;
const getAllVenues = async (req, res) => {
  try {
    const size = 3;
    const totalVenues = await Venue.count();
    const totalPage = Math.ceil(totalVenues/size);
    const offset = (currentPage-1)*size;
    
    const venues = await Venue.findAll({
      limit:size,
      offset:offset
    });
    res.json({
      currentPage,
      totalPage,
      data:venues
    });
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
  const transaction = await sequelize.transaction();
  try {
    const [updated] = await Venue.update(req.body, { where: { id: req.params.id } },
      {transaction}
    );
    if (!updated) return res.status(404).json({ error: 'Venue not found' });

    await transaction.commit();
    res.json({ message: 'Venue updated successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

const deleteVenue = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const deleted = await Venue.destroy({ where: { id: req.params.id } },
      {transaction}
    );
    if (!deleted) return res.status(404).json({ error: 'Venue not found' });

    await transaction.commit();
    res.json({ message: 'Venue deleted successfully' });
  } catch (error) {
    await transaction.rollback();
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

export default {
    getAllVenues,
    createVenue,
    getVenueById,
    updateVenue,
    deleteVenue,
    oneToMany
}