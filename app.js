const express = require('express');
const expressHandlebars = require('express-handlebars');
const fortune = require('./lib/fortune.js');

const app = express();
const port = process.env.PORT || 3000;

app.engine('.hbs', expressHandlebars.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() });
});

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
