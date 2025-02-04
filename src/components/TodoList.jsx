import React from "react";
import { MdDeleteForever } from "react-icons/md";
import checked from "../assets/checked.png";
import unchecked from "../assets/unchecked.png";
import { FaRegEdit } from "react-icons/fa";

const TodoList = ({ text, id, completed, Delete, toggle }) => {
  return (
    <div className="flex items-center  select-none justify-between my-4 px-4 lg:px-7 lg:my-5">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex items-center gap-2"
      >
        <img
          className="w-4 lg:w-6"
          src={completed ? checked : unchecked}
          alt=""
        />
        <p
          className={`cursor-pointer text-black font-medium decoration-black decoration-2 ${
            completed && "line-through text-slate-800"
          } lg:text-lg`}
        >
          {text}
        </p>
      </div>
      <button
        onClick={() => {
          Delete(id);
        }}
        className={`bg-white p-0.5 cursor-pointer rounded-lg ${
          completed && " opacity-80"
        }`}
      >
        <MdDeleteForever className="w-5 h-5 text-red-600 lg:w-7 lg:h-7" />
      </button>
    </div>
  );
};

export default TodoList;
