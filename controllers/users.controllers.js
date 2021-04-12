const User = require('../models/User');


exports.usersPage = (req, res) => {
  User.find()
  .then(users => {
    console.log(users)
    res.render('users-list', { users });
  })
  .catch(error => {
    console.error(error);
    res.render('users-list');
  });
}
