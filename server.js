const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

require('./createDefaultAdminUser');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');


const app = express();
const PORT = process.env.PORT || 5000;

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

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
).then(() => {

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  }
).catch(err => console.log(err));