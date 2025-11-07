import { useState, useEffect } from "react";
import Empty from "../src/assets/img/empty.png";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // LocalStorage'dan malumotlarni olish
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  // LocalStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center transition-all duration-500 px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mt-10 mb-6 text-center">TODO LIST</h1>

      {/* Input va tugmalar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 w-full max-w-md">
        <div className="flex items-center border rounded-xl px-3 py-2 border-purple-400 flex-1 w-full">
          <i className="fa-solid fa-magnifying-glass text-purple-500 mr-2"></i>
          <input
            type="text"
            placeholder={editIndex !== null ? "Edit note..." : "Add new note..."}
            className={`bg-transparent outline-none flex-1 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>

        {/* Add va Dark/Light tugmalari */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={addTodo}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-xl flex-1 sm:flex-none"
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
      </div>

      {/* Todo list */}
      <div className="w-full max-w-md">
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-20 opacity-70">
            <img src={Empty} alt="Empty" className="w-40 mb-4" />
            <p>No tasks yet</p>
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
                <div className="flex items-center justify-between flex-wrap">
                  <div
                    onClick={() => toggleTodo(index)}
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <div
                      className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                        todo.done
                          ? "bg-purple-500 border-purple-500 text-white"
                          : "border-purple-400"
                      }`}
                    >
                      {todo.done && <i className="fa-solid fa-check text-xs"></i>}
                    </div>
                    <span
                      className={`font-semibold truncate ${
                        todo.done ? "line-through" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-2 sm:mt-0">
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
