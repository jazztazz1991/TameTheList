import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, username, email, password, birthday } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            name,
            username,
            email,
            password: hashedPassword,
            birthday,
            currentListType: 'checkbox'
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) {
            return res.status(404).json({ error: 'E-Mail or Password is incorrect' });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router as usersRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
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