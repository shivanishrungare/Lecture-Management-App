const User = require('../models/userSchema')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
};

exports.addUser = async (req, res) => {
    try {
      const { firstName, lastName, role, title, email, userName, password } = req.body;
      const status = "pending";

      if (!firstName || !lastName || !role || !email || !userName || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

    if (existingUser) {
        return res.status(400).json({ error: 'Email or Username already exists' });
    }
    
      const newUser = new User({firstName, lastName, role, title, email, userName, password, status});
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true,   
            runValidators: true,
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(400).json({ message: 'Server error' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });  
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(400).json({ message: 'Server error' });
    }
}



