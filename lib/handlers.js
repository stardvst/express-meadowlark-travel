const fortune = require('./fortune');

exports.home = (req, res) => {
  res.render('home');
};

exports.about = (req, res) => {
  res.render('about', { fortune: fortune.getFortune() });
};

exports.notFound = (req, res) => {
  res.status(404);
  res.render('404');
};

// eslint-disable-next-line no-unused-vars
exports.serverError = (err, req, res, next) => {
  res.status(500);
  res.render('500');
};
// eslint-enable-next-line no-unused-vars

exports.sectionTest = (req, res) => res.render('section-test');
