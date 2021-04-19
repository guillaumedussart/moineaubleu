const router = require('express').Router();
const indexRoutes = require('./index.routes');
const usersRouter = require('./users.routes');
const chirpsRouter = require('./chrips.routes');

router.use('/', indexRoutes);
router.use('/users', usersRouter);
router.use('/chirps', chirpsRouter);

module.exports = router;
