import React, { useEffect, useRef, useState } from "react";
import todo from "../assets/todo.png";
import TodoList from "./TodoList";
const Todo = () => {
  const refVal = useRef();
  const [todos, setTodos] = useState(
    localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
  );

  const Add = () => {
    const inputVal = refVal.current.value.trim();
    if (inputVal === "") return null;

    const todo_list = {
      text: inputVal,
      completed: false,
      id: Math.random() * 1000,
    };

    setTodos((perv) => [...perv, todo_list]);
    refVal.current.value = "";
  };

  const Delete = (id) => {
    setTodos((perv) => {
      return perv.filter((item) => item.id !== id);
    });
  };

  const Toggle = (id) => {
    setTodos((perv) => {
      return perv.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  const Change = (e) => {
    if (e.key === "Enter") {
      Add();
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long", // "Friday"
    year: "numeric", // "2025"
    month: "short", // "Jan"
    day: "numeric", // "25"
  });

  return (
    <div className="w-5/6 place-self-center my-5 bg-white/40 backdrop-blur-sm  rounded-lg border border-gray-300/30  min-h-auto lg:w-2/3">
      {/* {-----title----}       */}
      <div className="flex flex-col gap-2 justify-center items-center mt-3 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3 ">
          <img className="w-6 lg:w-7" src={todo} alt="" />
          <h1 className="font-bold text-3xl uppercase lg:text-4xl">Todo-App</h1>
        </div>
        <p className="text-sm italic lg:text-lg">{currentDate}</p>
      </div>

      {/* {-----input----}       */}

      <div className="bg-gray-200 flex rounded-full mt-7 w-[95%] mx-auto mb-6">
        <input
          onKeyDown={Change}
          ref={refVal}
          className=" bg-transparent border-0 outline-none placeholder:text-slate-600 px-3 w-full font-medium py-3 flex-1 rounded-full lg:text-base lg:px-5 lg:py-4"
          type="text"
          placeholder="Add your Task"
        />
        <button
          onClick={Add}
          className="lg:px-12 px-7 bg-gradient-to-r from-[#227e22] to-[#63a211] text-white rounded-full uppercase tracking-wider cursor-pointer font-semibold text-lg"
        >
          + Add
        </button>
      </div>

      {/* {-----TodoList----}       */}

      <div>
        {todos.map((item, index) => {
          return (
            <TodoList
              key={index}
              id={item.id}
              text={item.text}
              completed={item.completed}
              Delete={Delete}
              toggle={Toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
