const express = require('express');
const expressHandlebars = require('express-handlebars');
const fortune = require('./lib/fortune.js');
const handlers = require('./lib/handlers.js');

const app = express();
const port = process.env.PORT || 3000;

app.engine('.hbs', expressHandlebars.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.get('/', handlers.home);

app.get('/about', handlers.about);

app.use(express.static(__dirname + '/public'));

app.use(handlers.notFound);

app.use(handlers.serverError);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
