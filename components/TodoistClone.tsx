"use client";

import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Todoist Clone</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} handleEditClickTask={function (id: number): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
}
