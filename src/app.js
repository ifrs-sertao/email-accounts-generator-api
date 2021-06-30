const express = require('express');
const cors = require('cors');
require('express-async-errors');
const AppError = require('./shared/errors/AppError')
const app = express();
app.use(express.json());

const routes = require('./routes');

app.use(cors());

// Set default API response
app.get('/', (req, res) => {
    res.json({
      status: 'API Is Working',
      message: 'EMAIL ACCOUNTS GENERATOR API',
    });
  });

app.use('/api/v1', routes);


// error handler middleware - put this in other files
app.use((error, request, response, next) => {

  console.log("AppError: ", error)

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
});

module.exports = app;