// require('dotenv').config()
// const express = require('express')
// const path = require('path')
// const fs = require('fs')
// const https = require('https')
// const http = require('http')
// const passport = require('passport')
// const session = require('express-session')
// const cors = require('cors')
// const socketio = require('socket.io')
// const authRouter = require('./app/lib/auth.router')
// const passportInit = require('./app/lib/passport.init')
// const { SESSION_SECRET, CLIENT_ORIGIN } = require('./app/config')

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

//login FB
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const config = require('./app/config');

const app = express();
//let server
// If we are in production we are already running in https
// if (process.env.NODE_ENV === 'production') {
//   server = http.createServer(app)
// }
// // We are not in production so load up our certificates to be able to 
// // run the server in https mode locally
// else {
//   const certOptions = {
//     key: fs.readFileSync(path.resolve('certs/server.key')),
//     cert: fs.readFileSync(path.resolve('certs/server.crt'))
//   }
//   server = https.createServer(certOptions, app)
// }

// Setup for passport and to accept JSON objects
// app.use(express.json())
// app.use(passport.initialize())
// passportInit()

// Accept requests from our client
// app.use(cors({
//   origin: CLIENT_ORIGIN
// })) 

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
// app.use(session({ 
//   secret: process.env.SESSION_SECRET, 
//   resave: true, 
//   saveUninitialized: true
// }))

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
// const io = socketio(server)
// app.set('io', io)

// Catch a start up request so that a sleepy Heroku instance can  
// be responsive as soon as possible
//app.get('/wake-up', (req, res) => res.send('👍'))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/cause.routes")(app);

// Direct other requests to the auth router
//app.use('/', authRouter)

passport.use(new Strategy({
  clientID: config.FACEBOOK_CLIENT_ID,
  clientSecret: config.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'name', 'photos'],
  passReqToCallback: true,
},
function(accessToken, refreshToken, profile, cb) {
  // save the profile on the Database
  // Save the accessToken and refreshToken if you need to call facebook apis later on
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: `${config.FRONTEND_HOST}/error`}), (req, res) => {
  res.send(`${config.FRONTEND_HOST}/success`);
}) ;

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }