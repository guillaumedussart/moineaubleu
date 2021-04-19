const router = require('express').Router();
const {
  indexController,
} = require('../controllers/index.controller');

router.get('/', indexController);

module.exports = router;
