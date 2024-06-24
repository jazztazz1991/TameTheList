import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import { fileURLToPath } from 'url';
import { usersRouter } from './routes/users.js';
import { householdRouter } from './routes/household.js';
import { taskRouter } from './routes/task.js';
import { boardRouter } from './routes/board.js';
import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json()); //sets all data given from the front end in the form of a JSON file.

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_LINK, // Replace with your MongoDB URI
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60 // 14 days
  })
}));
app.use('/auth', usersRouter);
app.use('/household', householdRouter);
app.use('/task', taskRouter);
app.use('/board', boardRouter);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
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
