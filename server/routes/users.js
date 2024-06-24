import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';
import passport from 'passport';
import JwtCookieComboStrategy from 'passport-jwt-cookiecombo';
import GoogleStategy from 'passport-google-oauth20';

const router = express.Router();

const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';

passport.use(new JwtCookieComboStrategy({
    secretOrPublicKey: process.env.SECRET || 'secret',
}, (payload, done) => {
    console.log(payload)
    UserModel.findOne({ email: payload.email }, function (err, user) {
        if (err) {
            return done(new Error("UserNotFound"), null);
        } else if (payload.expire <= Date.now()) {
            return done(new Error("TokenExpired"), null);
        } else {
            return done(null, user);
        }
    });
}));

passport.use(new GoogleStategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/google/callback',
}, (accessToken, refreshToken, profile, email, cb) => {
    UserModel.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
            cb(null, currentUser);
        } else {
            console.log('User not found');
        }
    });
}))


// JWT Routes

router.post('/jwtLogin', async (req, res) => {
    try {
        console.log(req)
        const { email, password } = req.body.userInfo;
        const user = await UserModel.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) {
            return res.status(404).json({ error: 'E-Mail or Password is incorrect' });
        }
        jwt.sign({ user: user }, process.env.SECRET, { expiresIn: '2h' }, (err, token) => {
            console.log(token)
            if (err) {
                res.status(500).json({ error: err.message });
            }
            res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: true })

            return res.json({ jwt: token, user: { name: user.name, email: user.email, lastLoggedIn: user.lastLoggedIn, id: user._id } });
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});

// Google Routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }), (req, res) => {
        console.log('=====================')
        console.log(req)
        console.log('=====================')


    }
);

router.get('/google/callback',
    passport.authenticate('google', { scope: ['profile', 'email'], failureRedirect: '/login', clientSecret: process.env.SECRET }),
    function (req, res) {
        // Successful authentication, redirect home.
        jwt.sign({ user: req.user }, process.env.SECRET, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }
            res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: true })

            return res.json({ jwt: token, user: { name: user.name, email: user.email, lastLoggedIn: user.lastLoggedIn, id: user._id } });
        });
        res.redirect('http://localhost:5173/boards');
    }
);

router.post('/register', async (req, res) => {
    try {
        const { name, username, email, password, birthday } = req.body.userInfo;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            name,
            username,
            email,
            password: hashedPassword,
            birthday
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export { router as usersRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorizations'];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    console.log('token:')
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
    return next();
}