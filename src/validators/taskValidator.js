import { z } from 'zod';
const baseTaskSchema = {
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['pending', 'in_progress', 'completed']),
  dueDate: z.string().min(1, 'Due date is required'),
};

export const taskSchema = z.object(baseTaskSchema);

export const updateTaskSchema = z.object(
  Object.fromEntries(
    Object.entries(baseTaskSchema).map(([key, schema]) => [
      key,
      schema.optional(),
    ])
  )
);
