import express from 'express';
import { BoardModel } from '../models/Board.js';
import { verifyToken } from './users.js';
import { HouseholdModel } from '../models/Household.js';
import { UserModel } from '../models/Users.js';


const router = express.Router();

router.post('/create', verifyToken, async (req, res) => {
    try {
        const { name, householdId } = req.body;
        const household = await HouseholdModel.findById(householdId);
        const board = await BoardModel.create({
            name,
            household: household._id,
            members: household.members
        });
        for (const member of household.members) {
            const user = await UserModel.findById(member);
            user.boards.push(board._id);
            await user.save();
        }
        household.boards.push(board._id);
        await household.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/allByUser', verifyToken, async (req, res) => {
    console.log('allByUser is running')
    try {
        console.log(req.user.id)
        const user = await UserModel.findById(req.user.id).populate('boards');
        res.status(200).json(user.boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/allByHousehold', verifyToken, async (req, res) => {
    try {
        const household = await HouseholdModel.findById(req.body.householdId).populate('boards');
        res.status(200).json(household.boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const board = await BoardModel.findById(req.params.id);
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/addMember', verifyToken, async (req, res) => {
    try {
        const { boardId, userId } = req.body;
        const user = await UserModel.findById(userId);
        const board = await BoardModel.findById(boardId);
        board.members.push(user._id);
        await board.save();
        user.boards.push(board._id);
        await user.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/removeMember', verifyToken, async (req, res) => {
    try {
        const { boardId, userId } = req.body;
        const user = await UserModel.findById(userId);
        const board = await BoardModel.findById(boardId);
        board.members = board.members.filter(member => member.toString() !== user._id.toString());
        await board.save();
        user.boards = user.boards.filter(board => board.toString() !== board._id.toString());
        await user.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router as boardRouter };


