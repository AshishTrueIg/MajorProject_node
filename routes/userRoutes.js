import express from 'express';
import userController from '../controllers/user.controller.js'
import validate from '../utils/ajvValidator.js'
import createUserSchema from '../validators/userValidator.js';

const router = express.Router();

router.get('/',userController.getAllUsers);

router.get('/oneToMany',userController.OneToMany);

router.get('/rawQuery',userController.rawQueryUser);

router.get('/:id',userController.getUserById);

router.post('/', validate(createUserSchema) ,userController.createUser);

router.put('/:id',validate(createUserSchema),userController.updateUser);

router.delete('/:id',userController.deleteUser);



export default router;