const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const algorithm = 'aes-256-ctr';
const IV_LENGTH = 16;

function loadPrivatekey () {
  const privateKey = fs.readFileSync(path.join(__dirname, '../config', 'certs', 'private_rsa'), 'utf-8');
  return privateKey;
}

const ENCRYPTION_KEY = crypto.createHash('sha256').update(String(loadPrivatekey())).digest('base64').substr(0, 32);

function encrypt (text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt (text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt
};
