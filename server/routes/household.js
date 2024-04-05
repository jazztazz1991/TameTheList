import express from 'express';
import { HouseholdModel } from '../models/Household.js';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.post('/create', verifyToken, async (req, res) => {
    try {
        const { name, members } = req.body;
        const household = await HouseholdModel.create({
            name,
            members
        });
        const user = await UserModel.findById(req.user.id);
        user.households.push(household._id);
        await user.save();
        res.status(201).json(household);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).populate('households');
        res.status(200).json(user.households);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const household = await HouseholdModel.findById(req.params.id)
        res.status(200).json(household);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/addMember', verifyToken, async (req, res) => {
    try {
        const { householdId, userId } = req.body;
        const user = await UserModel.findById(userId);
        const household = await HouseholdModel.findById(householdId);
        household.members.push(user._id);
        await household.save();
        user.households.push(household._id);
        await user.save();
        res.status(201).json(household);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/removeMember', verifyToken, async (req, res) => {
    try {
        const { householdId, userId } = req.body;
        const user = await UserModel.findById(userId);
        const household = await HouseholdModel.findById(householdId);
        household.members = household.members.filter(member => member.toString() !== user._id.toString());
        await household.save();
        user.households = user.households.filter(household => household.toString() !== householdId);
        await user.save();
        res.status(201).json(household);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const household = await HouseholdModel.findById(req.params.id);
        const user = await UserModel.findById(req.user.id);
        user.households = user.households.filter(household => household.toString() !== req.params.id);
        await user.save();
        await household.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Household deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router as householdRouter };