const express = require("express");
const helmet = require('helmet');
const compression = require('compression');
const constants = require("./connections/constants");
const connectDB = require("./connections/db");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser');

//server configuration
const app = express();

// API prefix
const apiPrefix = '/api/v1';

// Import routes
const authRoute = require("./routes/authRoutes");
const fieldsRoute = require("./routes/fieldRoutes");
// Database connection
connectDB();

// Set trust proxy for reverse proxy support
app.set("trust proxy", 1);

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
// Content Security Policy middleware using Helmet
app.use(
  helmet.contentSecurityPolicy()
);

// Routes
app.use(`${apiPrefix}/auth`, authRoute);
app.use(`${apiPrefix}`, fieldsRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" ,err:err.message});
});

// Start the server
app.listen(constants.PORT, () => {
  console.log(` Server running at port ${constants.PORT}`);
});

