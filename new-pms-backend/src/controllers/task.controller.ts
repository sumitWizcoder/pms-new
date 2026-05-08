import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../lib/prisma';

/**
 * CREATE a new task within a project
 */
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, projectId } = req.body;
    const userId = req.userId;

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
      },
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
    const { status } = req.body;
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
      data: { status },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};
