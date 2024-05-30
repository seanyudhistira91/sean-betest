// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
require('dotenv').config();


// Generate JWT token
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRED });
}

// Middleware to verify JWT token
const verifyToken = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'], // Specify the algorithm used for signing the token
});

module.exports = { generateToken, verifyToken };
