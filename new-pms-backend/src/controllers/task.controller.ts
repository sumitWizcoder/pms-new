import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../lib/prisma';
import { createTaskSchema } from '../schemas/task.schema';

/**
 * CREATE a new task within a project
 */
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    // 1. VALIDATE the request body
    const validation = createTaskSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validation.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }

    const { title, description, projectId, priority, assigneeId } = validation.data;
    const userId = req.userId; // The person logged in is the ASSIGNER

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // 1. Verify project exists AND belongs to the user
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== userId) {
      return res.status(404).json({ message: 'Project not found or unauthorized' });
    }

    // 2. Create the task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        priority: priority || 'MEDIUM',
        assignerId: userId, // Current user is the assigner
        assigneeId: assigneeId || null, // Optional: who is doing the work?
      },
      include: {
        assigner: { select: { name: true, email: true } },
        assignee: { select: { name: true, email: true } },
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

/**
 * UPDATE task status (e.g., move to DONE)
 */
export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, priority, assigneeId } = req.body;
    const userId = req.userId;

    // Verify task exists and user owns the parent project
    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true },
    });

    if (!task || task.project.userId !== userId) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { 
        status: status || task.status,
        priority: priority || task.priority,
        assigneeId: assigneeId !== undefined ? assigneeId : task.assigneeId,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};
