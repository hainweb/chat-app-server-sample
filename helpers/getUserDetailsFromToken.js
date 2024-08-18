const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const getUserDetailsFromToken = async (token) => {
    if (!token) {
      console.log("No token provided");
      return { message: "session out", logout: true };
    }
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECREAT_KEY);
      if (Date.now() >= decode.exp * 1000) {
        console.log("Token expired");
        return { message: "session expired", logout: true };
      }
      const user = await UserModel.findById(decode.id).select('-password');
      return user;
    } catch (error) {
      console.error("Error verifying token:", error);
      return { message: "invalid token", logout: true };
    }
  };

module.exports = getUserDetailsFromToken
