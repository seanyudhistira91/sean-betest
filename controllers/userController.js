// controllers/userController.js
const User = require('../models/User');
const Token = require('../middleware/authMiddleware');
const client = require('../config/redisClient');

class UserController {
  static async createUser(req, res) {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({error: err.message});
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }

  static async getUserByAccountNumber(req, res) {
    try {
      const user = await User.findOne({accountNumber: req.query.accountNumber});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }


  static async deleteUser(req, res) {
    try {
      await User.deleteOne({_id: req.query.id});
      res.status(202).json({message: 'Delete Success'})
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }

  static async getGenerateToken(req, res) {
    try {
      const user = await User.findOne({userName: req.query.userName});
      const token = Token.generateToken({id: user.id})
      console.log(token);
      res.status(201).json({token: token});
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }

  static async patchUser(req, res) {
    const {id} = req.params
    try {
      let user = await User.findById(id);
      if (req.body.userName) user.userName = req.body.userName;
      if (req.body.accountNumber) user.accountNumber = req.body.accountNumber;
      if (req.body.emailAddress) user.emailAddress = req.body.emailAddress;
      if (req.body.identityNumber) user.identityNumber = req.body.identityNumber;

      await user.save();
      res.status(200).json({message: 'update success'})
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }
}



module.exports = UserController;
