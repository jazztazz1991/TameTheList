// pages/api/login.js

import { client } from '../../client';

export default async (req, res) => {
    if (req.method === 'POST') {
        const user = req.body;

        try {
            await client.createIfNotExists(user);
            res.status(200).json('Login Success');
        } catch (error) {
            res.status(500).json('Login Failed');
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};