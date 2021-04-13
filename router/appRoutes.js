const router = require('express').Router();
const {
  homePageCtrl,
} = require('../controllers/appController');

router.get('/', homePageCtrl);

module.exports = router;
