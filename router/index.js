const router = require('express').Router();
const appRoutes = require('./index.routes');
const usersRouter = require('./users.routes');

router.use('/', appRoutes);
router.use('/users', usersRouter);

module.exports = router;
