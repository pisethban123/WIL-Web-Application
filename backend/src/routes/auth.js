const express = require('express');
const { registerUser, findUser } = require('../controllers/authController'); // Ensure correct import
const router = express.Router();

router.post('/register', registerUser);
router.get('/find/:username', findUser); // Add the route for finding a user

module.exports = router;