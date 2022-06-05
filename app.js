const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');
const weatherMiddlware = require('./lib/middleware/weather');

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.engine(
  '.hbs',
  expressHandlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
      section(name, options) {
        // eslint-disable-next-line no-underscore-dangle
        if (!this._sections) this._sections = {};
        // eslint-disable-next-line no-underscore-dangle
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  }),
);
app.set('view engine', '.hbs');

app.use(express.static(`${__dirname}/public`));
app.use(weatherMiddlware);

app.get('/', handlers.home);

app.get('/about', handlers.about);

app.get('/section-test', handlers.sectionTest);

app.get('/headers', (req, res) => {
  res.type('text/plain');
  const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`);
  res.send(headers.join('\n'));
});

app.use(handlers.notFound);

app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
} else {
  module.exports = app;
}
