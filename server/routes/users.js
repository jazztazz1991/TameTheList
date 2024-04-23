import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, username, email, password, birthday } = req.body.userInfo;
        console.log("line 11: " + name, username, email, password, birthday);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            name,
            username,
            email,
            password: hashedPassword,
            birthday
        });
        console.log("line 21: " + user);
        res.status(201).json(user);
    } catch (error) {
        console.log("line 24: " + error.message)
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

export { router as usersRouter };

export const verifyToken = (req, res, next) => {
    console.log(req.headers['authorizations']);
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