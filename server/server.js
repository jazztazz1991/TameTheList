import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { fileURLToPath } from 'url';
import { usersRouter } from './routes/users.js';
import { householdRouter } from './routes/household.js';
import { taskRouter } from './routes/task.js';
import { boardRouter } from './routes/board.js';
import bodyParser from 'body-parser';
import FormData from 'form-data';
import fetch from 'node-fetch';
import  GoogleStrategy from 'passport-google-oauth20';
import MongoStore from 'connect-mongo';
import { client_id, client_secret, redirect_uri } from './config/config.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json()); //sets all data given from the front end in the form of a JSON file.
app.use(cors());

app.use('/auth', usersRouter);
app.use('/household', householdRouter);
app.use('/task', taskRouter);
app.use('/board', boardRouter);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Session setup
app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/sessions', // Replace with your MongoDB URI
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60 // 14 days
  })
}));

app.use(cookieSession({
  name: "session", //name of the cookie
  keys: ["privatekey1"], //key to sign the cookie
  maxAge: 24 * 60 * 60 * 1000, //24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/google/callback'
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('http://localhost:3001');
  });
app.get('/logout', (req, res) => {
  req.logout(function(err){
    if (err) { return next(err);}
  });
  res.redirect('http://localhost:3001');
  }
);
app.get('/api/user', (req, res) => {
  res.send(req.user);
})
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));

app.use(passport.authenticate('session'));  //passport.authenticate('session') is a middleware that will check if the user is authenticated or not.

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/authenticate", (req, res) => {
  const { code } = req.body;

  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", redirect_uri);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");

      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
})

mongoose.connect(process.env.DB_LINK);

if (process.env.PORT) {
  app.listen(process.env.PORT, () => console.log("SERVER STARTED!"));
}
