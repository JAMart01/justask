// Dependencies
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controller');
const path = require('path');
const exphbs = require('express-handlebars');
// const hbs = exphbs.create({helpers});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Setting up app and port variables
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'rgdfg dfgdgf sedfgdfgcret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Preparing data to be parsed
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const helpers = require('./utils/helpers');
const hbs = exphbs.create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: 'main',
  extname: 'handlebars',
   helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(routes);
app.use(session(sess));

// Initialize connection to the Sequelize database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});