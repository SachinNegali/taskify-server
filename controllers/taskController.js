import Task from "../models/Tasks.js";
import { Types } from "mongoose";

const { ObjectId } = Types;

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  console.log(title, description);
  const { _id } = req.user;
  const newTask = new Task({
    title,
    description,
    userId: _id,
  });
  await newTask.save();
  res.status(200).json({
    message: "Task created successfully",
    taskId: newTask._id,
  });
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding task", error });
  }
};

export const getTasks = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user._id, typeof req.user._id);

  const tasks = await Task.aggregate([
    {
      $match: {
        userId: new ObjectId(`${_id}`),
        isDeleted: false,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        isCompleted: 1,
      },
    },
  ]);

  res.status(200).send({ message: "tasks fetched successfully", tasks });
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up", error });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const task = await Task.findOne({
      userId: _id,
      _id: id,
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });
    res.status(200).send({ message: "task fetched successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up", error });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  const { _id } = req.user;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId.toString() !== _id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.isCompleted =
      isCompleted !== undefined ? isCompleted : task.isCompleted;
    task.updatedAt = Date.now();
    await Task.findByIdAndUpdate(id, { ...task });
    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndUpdate(id, { isDeleted: true });
    res.status(200).json({
      message: "Task updated successfully",
      taskId: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up", error });
  }
};
