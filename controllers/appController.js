

exports.homePageCtrl = (req, res) => {

  res.render('pages/index',{
    title:"Moineau bleu"
  });
};

exports.booksPageCtrl = (req, res) => {
  res.render('user-list');
};
