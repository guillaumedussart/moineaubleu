const router = require('express').Router();
const {
	signInPage,
	signUpPage
} = require('../controllers/usersController');

router.get('/signin', signInPage);
router.get('/signup', signUpPage);

module.exports = router;
