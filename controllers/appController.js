

exports.homePageCtrl = (req, res) => {
  req.session.test = 'test';
  console.log(req.session)
  res.render('pages/index',{
    title:'Moineau bleu',
    session:req.session

  });
};

exports.booksPageCtrl = (req, res) => {
  res.render('user-list');
};
