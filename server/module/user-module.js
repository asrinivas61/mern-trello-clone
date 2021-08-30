const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const UserSchema = require('../models/User');
const config = require('../config');

class User {
  constructor () {
  }

  async createUser (req) {
    const { name, email, password } = req.body;

    console.log('email', email);
    console.log('inside', await UserSchema.findOne({ email }));
    if (await UserSchema.findOne({ email })) {
      
      throw {
        status: 400,
        errors: [{ msg: 'User already exists' }]
      };
    }

    const user = new UserSchema({
      name,
      email,
      avatar: gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }),
      password: await bcrypt.hash(password, await bcrypt.genSalt(10))
    });

    await user.save();

    const privateKey = fs.readFileSync(path.join(__dirname, '../config', 'certs', 'private_rsa'), 'utf-8');
    const token = jwt.sign({
      data: {
        user: {
          id: user.id
        }
      },
      exp: Math.floor(Date.now() / 1000) + config.EXPIRY
    }, privateKey, { algorithm: 'HS256' });

    return token;
  }

  async fetchUsers (req) {
    const regex = new RegExp(req.params.input, 'i');
    const users = await UserSchema.find({
      email: regex
    }).select('-password');

    return users.filter((user) => user.id !== req.user.id);
  }
}

module.exports = User;
