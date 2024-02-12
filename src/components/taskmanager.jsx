import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function TaskManager() {
  const [task, setTask] = useState("");
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksRef = collection(db, "todolist");
        const querySnapshot = await getDocs(tasksRef);
        const tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasksList(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, [task]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = async () => {
    try {
      const newTaskRef = await addDoc(collection(db, "todolist"), {
        task: task,
        completed: false,
      });
      setTask("");
    } catch (error) {
      console.error("Error adding task: ", error.message);
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      const taskDocRef = doc(db, "todolist", taskId);
      await updateDoc(taskDocRef, {
        completed: !completed,
      });

      setTasksList(
        tasksList.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: !completed };
          }
          return task;
        })
      );
    } catch (error) {
      console.error("Error toggling task completion: ", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="p-8 border border-gray-300 rounded-lg shadow-lg w-96 md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Current Task:</h2>
          <h3 className="my-2 text-green-600">
            Click the task after completion
          </h3>
          <ul>
            {tasksList.map((task) => (
              <li
                key={task.id}
                className={
                  task.completed
                    ? "line-through cursor-pointer"
                    : "cursor-pointer"
                }
                onClick={() => toggleTaskCompletion(task.id, task.completed)}
              >
                {task.task}
              </li>
            ))}
          </ul>
        </div>
        <h1 className="text-lg">Add Task:</h1>
        <textarea
          className="w-full h-24 p-2 mb-4 border border-gray-300 rounded"
          placeholder="Type your task here..."
          value={task}
          onChange={handleChange}
        />
        <button
          className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TaskManager;
