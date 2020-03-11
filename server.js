const express = require('express');

require('./createDefaultAdminUser');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');


const app = express();

app.use(express.json());

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this api route.', 404);
  throw error;
})

app.use((error, req, res, next) => {
  if(res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occured!'});
});

module.exports = app;