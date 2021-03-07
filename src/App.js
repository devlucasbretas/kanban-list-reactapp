import React, { useState} from "react";
import "./styles.css";

//importação dos componentes do que farão parte do app
import Navbar from "./components/Navbar/navbar";
import TaskList from "./components/TaskList/TaskList";

let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};


//conteudo do app que sera renderizado no html
export default function App() {
  const [tasks, setTasks] = useState([])

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return {...tasks, title, state}
        } else {
          return task;
        }
      })
    });
  };

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    })
  };

  return (
    //abaixo o conteúdo <Navbar /> sendo acrecentado no app
    <div className="App">
      <Navbar />    
      <div className="container">
        <TaskList 
          title="Pendente" 
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")} 
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList 
          title="Fazendo" 
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((t) => t.state === "Fazendo")} 
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList 
          title="Completa" 
          onAddTask={addTask}
          taskState="Completa"
          tasks={tasks.filter((t) => t.state === "Completa")} 
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
