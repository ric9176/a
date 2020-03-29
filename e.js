const crypto = require('crypto');

const defaultAlgorithm = 'aes-256-gcm';

const keyGen = (salt) => crypto.pbkdf2Sync(process.env.KEY, salt, 2145, 32, 'sha512');

const e = (data, algorithm = defaultAlgorithm) => {
  const salt = crypto.randomBytes(64);
  const iv = crypto.randomBytes(16);
  const key = keyGen(salt);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
};

module.exports = {
  e,
};
