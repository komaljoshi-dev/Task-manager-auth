import express from 'express';
import Task from '../models/task.js';
import { authenticateToken } from '../middlewares/authmw.js';

const router = express.Router();

//create task
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const task = await Task.create({
      //req.body has the content whoch we sent and req.user gets the content from header
      title: req.body.title,
      description: req.body.description,
      user: req.user.userId   
      // ownership comes from token
      //means authenticated individual whose token is there, task will be created for that user only
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

//GET ALL TASKS (only logged-in user's tasks)
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    //for the task ,key user has value as id of that user
    //here we are finding the user's id which matches the token (payload id)
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});


//GET SINGLE TASK (only if owned)
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId
    });
    //this checks if this resource belongs to this user
    //here if the taskid provided in url is task of user in the token header

    if (!task) {
      const err = new Error('Task not found or unauthorized');
      err.statusCode = 404;
      throw err;
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
});

//UPDATE TASK (only if owned)
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
  
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, //_id contains the taskid of the task how it is stored in database
         user: req.user.userId //user has the user's id who created that task
        },
      req.body,
      { new: true }
    );
    //we check for the token we have provided, there would be user id in that(token is created with userid too) means the update happens only when the taskid in URL is connected with the user otherwise user cant can't access someone else's tasks

    if (!task) {
      const err = new Error('Task not found or unauthorized');
      err.statusCode = 404;
      throw err;
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
});


// DELETE TASK (only if owned)
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!task) {
      const err = new Error('Task not found or unauthorized');
      err.statusCode = 404;
      throw err;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
