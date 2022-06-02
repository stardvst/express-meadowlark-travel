const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.engine('.hbs', expressHandlebars.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.get('/', handlers.home);

app.get('/about', handlers.about);

app.get('/headers', (req, res) => {
  res.type('text/plain');
  const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`);
  res.send(headers.join('\n'));
});

app.use(express.static(`${__dirname}/public`));

app.use(handlers.notFound);

app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
} else {
  module.exports = app;
}
