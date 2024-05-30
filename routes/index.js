// routes/index.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { cacheResponse } = require('../middleware/cacheMiddleware');

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.post('/users', UserController.createUser);
router.get('/users', verifyToken, UserController.getUsers);
router.get('/user', verifyToken, UserController.getUserByAccountNumber)
router.delete('/user', verifyToken, UserController.deleteUser);
router.patch('/user/:id', verifyToken, UserController.patchUser);
router.get('/userGenerateToken', cacheResponse, UserController.getGenerateToken);

module.exports = router;
