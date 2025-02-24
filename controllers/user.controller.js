const db = require('../models/index')
const User = db.User;
const Ticket = db.Ticket;

const getAllUsers = async (req,res)=>{
    try {
        const data = await User.findAll();
        res.status(200).json({data:data});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const getUserById = async (req,res)=>{
    try {
        const user = await User.findByPk(req.params.id , {include:Ticket});

        if(!user)res.status(404).json("User not found");
        
        res.status(200).json({data:user});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const createUser = async (req,res)=>{
    try {
        
        const user = await User.create(req.body);        
        res.status(200).json({message:"User Created Successfully"});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const updateUser = async (req,res)=>{
    try {

        const user = await User.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        
        if(!user) res.status(404).json({error:"User not found"})
        
        res.status(200).json({message:"User Updated Successfully"});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const deleteUser = async (req,res)=>{
    try {

        const user = await User.destroy({
            where:{
                id:req.params.id
            }
        });
        if(!user) res.status(404).json({error:"User not found"})        
        res.status(200).json({message:"User Deleted Successfully"});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

const OneToMany = async (req,res)=>{
    try {
        const data = await User.findAll({include:Ticket});
        res.status(200).json({data:data});

    } catch (error) {
        res.status(500).json({error : error.message});
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    OneToMany
}