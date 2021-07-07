const router = require('express').Router();
const home = require('./home');
const login = require('./login');
const profile = require('./profile');
const signup = require('./signup');


router.use('/', home);
router.use('/login', login);
router.use('/profile', profile);
router.use('/signup', signup);

router.use((req, res) => {res.send('<h1>404</h1>')});

module.exports = router;