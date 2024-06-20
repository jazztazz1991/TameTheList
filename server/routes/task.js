import express from 'express';
import { verifyToken } from './users.js';
import { TaskModel } from '../models/Task.js';
import { BoardModel } from '../models/Board.js';

const router = express.Router();

router.post('/create', verifyToken, async (req, res) => {
    try {
        console.log(req.body)
        const { name, boardId, description, priority } = req.body;
        console.log(name, boardId, description, priority)
        const board = await BoardModel.findById(boardId);
        const task = await TaskModel.create({
            name,
            board: board._id,
            description: description || '',
            priority: priority || 'low'
        });
        console.log(task)
        board.tasks.push(task._id);
        await board.save();
        task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/allByBoard/:boardId', verifyToken, async (req, res) => {
    try {
        const board = await BoardModel.findById(req.params.boardId).populate('tasks');
        console.log(board.tasks)
        res.status(200).json(board.tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/addSubtask', verifyToken, async (req, res) => {
    try {
        const { taskId, name, description } = req.body;
        const task = await TaskModel.findById(taskId);
        task.subtasks.push({
            name,
            description: description || ''
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/complete', verifyToken, async (req, res) => {
    try {
        const task = await TaskModel.findById(req.body.taskId);
        task.completed = true;
        if (task.repeated) {
            switch (task.repeatTime) {
                case 'daily':
                    task.dueDate = new Date(task.dueDate.getTime() + 86400000);
                    break;
                case 'weekly':
                    task.dueDate = new Date(task.dueDate.getTime() + 604800000);
                    break;
                case 'monthly':
                    console.log(new Date(task.dueDate.getTime()))
                    console.log(new Date(task.dueDate.getTime() + 2592000000))
                    task.dueDate = new Date(task.dueDate.getTime() + 2592000000);
                    break;
                case 'yearly':
                    task.dueDate = new Date(task.dueDate.getTime() + 31536000000);
                    break;
            }
            task.completed = false;
        }
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/subtask/complete', verifyToken, async (req, res) => {
    try {
        const task = await TaskModel.findById(req.body.taskId);
        task.subtasks[req.body.subtaskIndex].completed = true;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router as taskRouter };