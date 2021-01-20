const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const authMiddleware = require('../middleware/authMiddleware');
const models = require('../models');
const { userLogin } = require('../controllers/userControllers');
const { getStoragesData, deleteStorage, registerUser, addStorage } = require('../controllers/userControllers');

const router = Router();

// api/user/login
router.post('/login', userLogin);

// api/user/register
router.post('/register', registerUser);

// api/user/storage
router.post('/storage', addStorage);

// api/user/storage
router.get('/storage', authMiddleware, getStoragesData);

// api/user/delete_storage
router.post('/delete_storage', deleteStorage);

module.exports = router;
