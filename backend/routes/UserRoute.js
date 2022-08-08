const express = require('express');
const { signin, login, verifyUser, getUser, logout } = require('../controllers/UserController');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.send("Hello User!");
});

router.post('/signin', signin);
router.post('/login', login);
router.get('/user', verifyUser, getUser);
router.get('/logout', verifyUser, logout);

module.exports = router;