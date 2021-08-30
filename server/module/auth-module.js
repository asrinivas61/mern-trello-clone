const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const UserSchema = require('../models/User');
const config = require('../config');

class Board {
  constructor () {
  }

  async postAuth (req) {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });
    if (!user) {
      throw {
        status: 400,
        errors: [{ msg: 'Invalid credentials' }]
      };
    }

    // Check for email and password match
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('user:', isMatch);
    if (!isMatch) {
      throw {
        status: 400,
        errors: [{ msg: 'Invalid credentials' }]
      };
    }
    const privateKey = fs.readFileSync(path.join(__dirname, '../config', 'certs', 'private_rsa'), 'utf-8');
    let token;
    if (user) {
      token = jwt.sign({
        user: {
          id: user.id
        },
        exp: Math.floor(Date.now() / 1000) + config.EXPIRY
      }, privateKey, { algorithm: 'HS256' });
      return token;
    }
  }

  async getAuth (req) {
    const user = await UserSchema.findById(req.user.id).select('-password');
    return user;
  }
}

module.exports = Board;
