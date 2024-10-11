import User from '../models/user.ts';
import {Request,Response} from 'npm:express';

const getUser= async (req : Request ,res: Response) => {
 try {
    const user = await User.findById(req.params.id);
    res.json(user);
 } catch (error) {
  res.json({message: error.message});
 } 
}

const getUsers = async(_req : Request ,res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
    } catch (error) {
      res.json({message: error.message});
    }
};

const createUser= async (req : Request ,res: Response) => {
  
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (_error) {
    res.status(400).json({message: _error.message});
  }
};

const updateUser = async (req : Request ,res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({message: 'User not found'});
    if (req.body.name != null) user.name = req.body.name;
    if (req.body.email != null) user.email = req.body.email;
    if (req.body.password != null) user.password = req.body.password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const deleteUser = async (req : Request ,res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({message: 'User not found'});
    await user.deleteOne();
    res.json({message: 'User deleted'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

export { getUser, getUsers, createUser, updateUser, deleteUser };