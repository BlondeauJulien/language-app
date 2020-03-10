const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({msg: 'Hello World!'}));

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