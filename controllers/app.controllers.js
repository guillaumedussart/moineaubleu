

exports.homePageCtrl = (req, res) => {
  res.render('auth/login',{
    title:"Moineau bleu"
  });
};

exports.booksPageCtrl = (req, res) => {
  res.render('user-list');
};
