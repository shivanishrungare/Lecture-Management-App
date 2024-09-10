const mongoose = require('mongoose');
const adminRoutes = require('./api/adminRoutes');
const userRoutes = require('./api/userRoutes');
const planRoutes = require('./api/planRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');  

dotenv.config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors())

app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plan', planRoutes);

const mongodb_uri = process.env.MONGODB_URI;
mongoose
  .connect(mongodb_uri)
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

module.exports = app;
