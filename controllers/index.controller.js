

exports.homePageCtrl = (req, res) => {
  res.render('pages/index',{
    title:'Moineau bleu',
    session:req.session

  });
};

exports.booksPageCtrl = (req, res) => {
  res.render('user-list');
};
