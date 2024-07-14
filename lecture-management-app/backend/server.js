const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);


const mongodb_uri = process.env.MONGODB_URI;
mongoose
  .connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

