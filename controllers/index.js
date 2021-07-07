const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/api', apiRoutes);

router.use('/profile', profileRoutes);
router.use('/', homeRoutes);


module.exports = router;
