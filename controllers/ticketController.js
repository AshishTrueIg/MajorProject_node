const db = require('../models/index')
const Ticket = db.Ticket;

const getAllTickets = async (req,res)=>{
    try {
        const data = await Ticket.findAll({});
        res.json(data)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const getUserTickets = async (req,res)=>{
    try {
        const userId = req.params.id;
        console.log(userId);
        if(!userId)
            return res.status(400).json({error : "User Id is required"})

        const data = await Ticket.findAll({
            where:{
                userId
            }
        });
        res.json(data)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


const cancelTicket = async (req,res)=>{
    try {
        const data = await Ticket.destroy({
            where:{
                id:req.params.id
            }
        });

        if(!data) return res.json(404).json({error:"Ticket not found"})

        res.json({message:"Ticket canceled Successfully"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

module.exports = {
    getAllTickets,
    getUserTickets,
    cancelTicket
}