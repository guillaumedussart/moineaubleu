const router = require('express').Router();
const appRoutes = require('./index.routes');
const usersRouter = require('./users.routes');
const chirpsRouter = require('./chrips.routes');

router.use('/', appRoutes);
router.use('/users', usersRouter);
router.use('/chirps', chirpsRouter);

module.exports = router;
