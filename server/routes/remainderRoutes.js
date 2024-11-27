import express from 'express';
import mongoose from 'mongoose';
import Remainder from '../models/reminders.js';
import userIdMiddleware from '../middlewares/check-auth.js';
import User from '../models/users.js';

const router = express.Router();

// GET route to fetch reminders based on user ID
router.post('/all', userIdMiddleware, (req, res) => {
    const userId = req.userId;
    console.log({ userId });

    Remainder.find({ User: userId })
        .populate('User', 'email')
        .exec()
        .then((reminders) => {
            res.status(200).json({
                count: reminders.length,
                data: reminders.map((reminder) => {
                    return {
                        _id: reminder._id,
                        priority: reminder.priority,
                        content: reminder.content,
                        startDate: reminder.startDate,
                        endDate: reminder.endDate,
                        isActive: reminder.endDate > Date.now(),
                        user: {
                            _id: reminder.User._id,
                            email: reminder.User.email,
                        },
                    };
                }),
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.get('/:id', userIdMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    console.log(userId, id);
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }
    let objectId;
    try {
        objectId = new mongoose.Types.ObjectId(id);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    try {
        const filterQuery = { User: userId, _id: id };
        let data = await Remainder.findOne(filterQuery);
        res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ message: 'Something wrong' });
    }
});

router.post('/add', userIdMiddleware, (req, res) => {
    const { priority, content, startDate, endDate } = req.body;
    const userId = req.userId;

    const reminder = new Remainder({
        _id: new mongoose.Types.ObjectId(),
        priority,
        content,
        startDate,
        endDate,
        isActive: true,
        User: userId,
    });

    reminder
        .save()
        .then((result) => {
            res.status(201).json({
                data: {
                    _id: result._id,
                    priority: result.priority,
                    content: result.content,
                    startDate: Date.now(),
                    endDate: result.endDate,
                    isActive: result.isActive,
                    user: result.user,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.post('/filter', userIdMiddleware, async (req, res) => {
    const userId = req.userId;
    const { priority, active } = req.body;
    try {
        let query = { User: userId };
        if (priority) {
            query.priority = priority;
        }
        if (active) {
            query.isActive = active ? true : false;
        }

        let reminders = await Remainder.find(query).sort({ endDate: -1 }).populate('User');

        res.status(200).json({
            count: reminders.length,
            reminders: reminders.map((reminder) => ({
                _id: reminder._id,
                priority: reminder.priority,
                content: reminder.content,
                startDate: reminder.startDate,
                endDate: reminder.endDate,
                isActive: reminder.endDate > Date.now(),
                user: {
                    _id: reminder.User._id,
                    email: reminder.User.email,
                },
            })),
        });
    } catch (error) {
        console.error('Error filtering reminders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete/:id', userIdMiddleware, async (req, res) => {
    const remainderId = req.params.id;
    const userId = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'ID is required' });
    }
    let objectId;
    try {
        objectId = new mongoose.Types.ObjectId(remainderId);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    try {
        let deletedRemainder = await Remainder.deleteOne({ _id: objectId });
        if (deletedRemainder.deletedCount > 0) {
            res.status(200).json({ message: 'Deleted' });
        } else {
            res.status(404).json({ message: 'No document found with this ID' });
        }
    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/edit/:id', userIdMiddleware, async (req, res) => {
    const userId = req.userId;
    const objId = req.params.id;
    console.log({ userId, objId });
    const { content, endDate, priority, startDate, isActive } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'ID is required' });
    }
    let objectId;
    try {
        objectId = new mongoose.Types.ObjectId(objId);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    try {
        const filter = { _id: objectId };
        const updateDoc = {
            $set: { content, endDate, priority, _id: objId, startDate, isActive, userId },
        };

        let updatedRemainder = await Remainder.updateOne(filter, updateDoc);
        if (updatedRemainder.modifiedCount > 0) {
            res.status(200).json({ message: 'acknowledged', data: updateDoc.$set });
        } else {
            res.status(404).json({ message: 'No document found with this ID' });
        }
    } catch (error) {
        console.error('Error updating reminder:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
