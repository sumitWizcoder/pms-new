import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../lib/prisma";

/**
 * CREATE a new project
 */
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.userId; // Provided by authMiddleware

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Error creating project" });
  }
};

/**
 * GET all projects for the logged-in user
 */
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Show newest projects first
    });

    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

/**
 * DELETE a project
 */
export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Check if the project exists AND belongs to the user
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project || project.userId !== userId) {
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Error deleting project" });
  }
};
