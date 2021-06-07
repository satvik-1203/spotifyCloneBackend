const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
