import { Request, Response } from 'express';
import User from '../models/User';

// GET all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// CREATE user
export const createUser = async (req: Request, res: Response) => {
  try {
    // 🟢 Body empty ho to turant error
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' });
    }

    const { name, email } = req.body;

    // 🟢 Required fields validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required' });
    }

    const user = new User({ name, email });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// UPDATE user
export const updateUser = async (req: Request, res: Response) => {
  try {
    // 🟢 Body empty ho to turant error
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty' });
    }

    const { name, email } = req.body;

    // 🟢 Required fields ka validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required to update user' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// DELETE user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};