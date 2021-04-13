const router = require('express').Router();
const appRoutes = require('./appRoutes');
const usersRouter = require('./usersRoutes');

router.use('/', appRoutes);
router.use('/users', usersRouter);

module.exports = router;
