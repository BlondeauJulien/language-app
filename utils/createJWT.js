const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJWT = (userId, email) => {
  let token;
  try {
    token = jwt.sign({
      userId,
      email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 360000
    });

    return token;

  } catch (error) {
    return;
  }
}

exports.createJWT = createJWT;