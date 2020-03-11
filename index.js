const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./server');

const dbUrl = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(
  dbUrl,
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