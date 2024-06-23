import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body.userInfo;
        const user = await UserModel.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) {
            return res.status(404).json({ error: 'E-Mail or Password is incorrect' });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        res.status(200).json({ token, user: { name: user.name, email: user.email, lastLoggedIn: user.lastLoggedIn, id: user._id } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/test', async (req, res) => {
    console.log(req.body);
    res.status(200).json({ msg: 'Success' });
})

export { router as usersRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorizations'];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
    return next();
}