const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/user');

const createdDefaultAdmin = async () => {
  try {
    const user = await User.findOne({role: 'admin'}, '-password');

    if(!user) {
      const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD,12);

      const adminUser = new User({
        username: process.env.DEFAUTL_ADMIN_NAME,
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
      })

      try {
        await adminUser.save();
      } catch (err) {
        console.log(err);
      }


    } else {
      console.log('Default admin already created')
    }
  } catch (err) {
    console.log(err)
  }
}

createdDefaultAdmin();