const router = require('express').Router();
const {
	signInPage,
	signUpPage,
	signUp,
	signIn,
	profilPage
} = require('../controllers/usersController');

router.get('/signin', signInPage);
router.post('/signin', signIn);
router.get('/signup', signUpPage);
router.post('/signup', signUp);
router.get('/profile', profilPage);

module.exports = router;
