const express = require('express');
const userController = require('../controllers/userController')
const validate = require('../utils/ajvValidator')
const createUserSchema = require('../validators/userValidator')

const router = express.Router();

router.get('/',userController.getAllUsers);

router.get('/:id',userController.getUserById);

router.post('/', validate(createUserSchema) ,userController.createUser);

router.put('/:id',validate(createUserSchema),userController.updateUser);

router.delete('/:id',userController.deleteUser);

module.exports = router;