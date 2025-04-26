import TryCatch from '../utils/TryCatch.js';
import Errorhandler from '../utils/Errorhandler.js';
import Task from '../models/Task.js';

export const getAllTasks = TryCatch(async (req, res, next) => {
  const tasks = await Task.find();
  if (!tasks || tasks.length)
    return next(new Errorhandler('No tasks found', 404));

  res.status(200).json({
    success: true,
    message: 'Tasks fetched',
    tasks,
  });
});

export const createTask = TryCatch(async (req, res, next) => {
  const { title, description, status, dueDate } = req.body;

  if (!title || !description || !status || !dueDate)
    return next(new Errorhandler('Please fill all the fields', 400));

  const newTask = await Task.create({
    title,
    description,
    status,
    dueDate,
  });

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
