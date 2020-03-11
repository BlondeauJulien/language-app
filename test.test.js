require('dotenv').config();

let dbUrl = process.env.MONGO_URI;

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.MONGO_URI_TEST;
}

console.log(dbUrl)