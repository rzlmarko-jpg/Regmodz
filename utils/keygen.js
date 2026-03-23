const crypto = require("crypto");

function generateKey() {
  return crypto.randomBytes(16).toString("hex").toUpperCase();
}

module.exports = { generateKey };
