const User = require('../models/userSchema')
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs')
const { generateToken } = require("../utils/jwtUtils")
require('dotenv').config();

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
};

exports.getProfessors = async( req,res ) => {
  try {
    const professors = await User.find({ role: 'Professor' }, 'firstName lastName');

    res.json(professors);
  } catch (error) {
    console.error('Error fetching professors:', error);
    res.status(500).json({ error: 'Failed to fetch professors' });
  }

}


exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

exports.registerUser = async (req, res) => {
  try {
    const {firstName, lastName, role, title, email, userName, password} = req.body;

    if (!firstName || !lastName || !role || !title || !email || !userName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    } 
    
    const newUser = new User({
      firstName, 
      lastName, 
      role, 
      title, 
      email, 
      userName, 
      password, 
      status: 'pending'
    })

    const createdUser = await newUser.save();
    res.status(200).json(createdUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(401).json({ message: 'Server error' });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!existingUser.email) {
      return res.status(401).json({ message: 'User email is not verified' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const role = existingUser.role;
    const userId = existingUser._id;

    const initials = `${existingUser.firstName.charAt(0)}${existingUser.lastName.charAt(0)}`

    const token = generateToken(existingUser);

    const status= existingUser.status
    
    res.status(200).json({ token, role, initials, userId, status, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

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
        console.error('Error updating user:', error);
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
        console.error('Error deleting user:', error);
        res.status(400).json({ message: 'Server error' });
    }
}

exports.pendingUsers = async (req, res) => {
    try {
       const users = await User.find({ status: 'pending' }).select('firstName lastName role userName email status');
       res.json({ users }); 
    } catch (error) {
       res.status(400).json({ message : error.message})
    }
}

exports.approvedUsers = async (req, res) => {
  try {
     const users = await User.find({ status: 'approved' }).select('firstName lastName role userName email status');
     res.json({ users }); 
  } catch (error) {
     res.status(400).json({ message : error.message})
  }
}

exports.rejectedUsers = async (req, res) => {
  try {
     const users = await User.find({ status: 'rejected' }).select('firstName lastName role userName email status');
     res.json({ users }); 
  } catch (error) {
     res.status(400).json({ message : error.message})
  }
}


exports.approveUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status update' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = status;
    const updatedUser = await user.save();

    if (status === 'approved') {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: {
            name: "LPMSync",
            address: process.env.EMAIL_USER,
          },
          to: user.email,
          subject: 'Registration Approved',
          text: 'Your registration has been approved.',
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  exports.rejectUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(id, { status: 'rejected' });
      res.status(200).json({ message: 'User rejected successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error rejecting user' });
    }
  };


  exports.revertUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(id, { status: 'pending' });
      res.status(200).json({ message: 'User status reverted to pending' });
    } catch (error) {
      res.status(500).json({ error: 'Error reverting user to pending' });
    }
  };
