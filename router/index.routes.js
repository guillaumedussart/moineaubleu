const router = require('express').Router();
const {
  homePageCtrl,
} = require('../controllers/index.controller');

router.get('/', homePageCtrl);

module.exports = router;
