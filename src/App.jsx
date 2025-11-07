import { useState } from "react";
import Empty from "../src/assets/img/empty.png";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  const addTodo = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {

      const updatedTodos = [...todos];
      updatedTodos[editIndex] = {
        ...updatedTodos[editIndex],
        text: task,
        editedAt: new Date(),
      };
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([
        ...todos,
        {
          text: task,
          done: false,
          createdAt: new Date(),
          editedAt: null,
        },
      ]);
    }

    setTask("");
  };


  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };


  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };


  const startEdit = (index) => {
    setTask(todos[index].text);
    setEditIndex(index);
  };


  const formatTime = (date) => {
    if (!date) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mt-10 mb-6">TODO LIST</h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center border rounded-xl px-3 py-2 border-purple-400">
          <i className="fa-solid fa-magnifying-glass text-purple-500 mr-2"></i>
          <input
            type="text"
            placeholder={
              editIndex !== null ? "Edit note..." : "Add new note..."
            }
            className={`bg-transparent outline-none ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>

        <button
          onClick={addTodo}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-xl"
        >
          {editIndex !== null ? "Save" : "Add"}
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 border border-purple-400 rounded-xl hover:bg-purple-100 dark:hover:bg-gray-700"
        >
          <i
            className={`fa-solid ${
              darkMode ? "fa-sun text-yellow-400" : "fa-moon text-purple-500"
            }`}
          ></i>
        </button>
      </div>

      <div className="w-[90%] max-w-md">
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 opacity-70">
            <img src={Empty} alt="Empty" className="w- mb-4" />
            <p>Empty</p>
          </div>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`flex flex-col gap-1 border-b border-purple-200 py-3 px-2 rounded transition ${
                  todo.done ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    onClick={() => toggleTodo(index)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                        todo.done
                          ? "bg-purple-500 border-purple-500 text-white"
                          : "border-purple-400"
                      }`}
                    >
                      {todo.done && (
                        <i className="fa-solid fa-check text-xs"></i>
                      )}
                    </div>
                    <span
                      className={`font-semibold ${
                        todo.done ? "line-through" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => startEdit(index)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteTodo(index)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-1 ml-8">
                  {todo.editedAt
                    ? `Edited at ${formatTime(todo.editedAt)}`
                    : `Added at ${formatTime(todo.createdAt)}`}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
