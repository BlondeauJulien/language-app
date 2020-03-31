const express = require('express');

const {createDefaultAdmin} = require('./createDefaultAdminUser');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
const coursesRoutes = require('./routes/courses-routes');
const vocabularyRoutes = require('./routes/vocabulary-routes');

createDefaultAdmin();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the server!',
  });
});

app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/vocabulary', vocabularyRoutes);

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