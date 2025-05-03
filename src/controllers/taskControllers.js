import TryCatch from '../utils/TryCatch.js';
import Errorhandler from '../utils/Errorhandler.js';
import Task from '../models/Task.js';
// import redis from '../config/redisClient.js';

export const getAllTasks = TryCatch(async (req, res, next) => {
  // const cacheKey = 'all_tasks';

  // const cachedTasks = await redis.get(cacheKey);

  // if (cachedTasks) {
  //   const tasks = JSON.parse(cachedTasks);
  //   res.status(200).json({
  //     success: true,
  //     message: 'Data from redis cache',
  //     tasks,
  //   });
  // }

  const tasks = await Task.find();
  if (!tasks || tasks.length === 0)
    return next(new Errorhandler('No tasks found', 404));

  // await redis.set(cacheKey, JSON.stringify(tasks), 'EX', 3600);

  res.status(200).json({
    success: true,
    message: 'Tasks fetched from database',
    tasks,
  });
});

export const createTask = TryCatch(async (req, res, next) => {
  const { title, description, status, dueDate } = req.body;

  const userId = req.user._id;

  if (!title || !description || !status || !dueDate)
    return next(new Errorhandler('Please fill all the fields', 400));

  const newTask = await Task.create({
    title,
    description,
    status,
    dueDate,
    createdBy: userId,
  });

  const io = req.app.get('io');
  io.emit('taskCreated', newTask);

  if (!newTask) return next(new Errorhandler('Unable to create the task', 500));

  res.status(201).json({
    success: true,
    message: 'Task created',
    newTask,
  });
});

export const updateTask = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  if (!updates)
    return next(new Errorhandler('Nothing found to be updated', 400));
  const task = await Task.findByIdAndUpdate(id, updates, { new: true });
  await task.save();
  res.status(200).json({
    success: true,
    message: `Task updated`,
    task,
  });
});

export const deleteTask = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return next(new Errorhandler('No task found', 404));
  res.status(200).json({
    success: true,
    message: `Task Deleted`,
  });
});
