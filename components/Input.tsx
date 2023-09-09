"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCalendarAlt,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { currentDate } from "@/utils/currentDate";
import { useSession } from "next-auth/react";
import { handleCreateToDo } from "@/utils/handleCreateTodo";
import { ToDo } from "@/typings";

type Props = {
  onTodoCreated: () => void;
};

const Input = ({ onTodoCreated }: Props) => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleCreate = async () => {
    if (!session) return;
    const todoDetails: ToDo = {
      email: session!.user!.email!,
      todo: input,
      date: date!,
      state: "open",
      tag: "",
    };
    const success = await handleCreateToDo(todoDetails);
    if (success) onTodoCreated();
  };

  return (
    <div className="fixed bottom-10 flex w-full justify-center max-w-3xl">
      {isInputVisible ? (
        <div className="flex w-full">
          <FontAwesomeIcon
            icon={faTimes}
            title="Abort"
            className="px-3 py-3 text-white h-5 w-5 mr-2 bg-blue-400/60 rounded-full hover:bg-blue-400/100 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={() => setIsInputVisible(false)}
          />
          <div className="flex items-center px-4 bg-gray-800 rounded-l-full">
            <FontAwesomeIcon
              className="text-white pr-2"
              icon={faCalendarAlt}
              onClick={() => document.getElementById("datepicker").focus()}
            />
            <DatePicker
              id="datepicker"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd.MM.yyyy HH:mm"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={10}
              className="bg-gray-800 text-white w-32 focus:ring-0 outline-none"
              placeholderText={currentDate}
              minDate={new Date()}
            />
          </div>

          <input
            type="text"
            className="flex-grow p-2 pl-4 bg-gray-800 text-white border-l border-gray-600 focus:ring-0 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleCreate();
            }}
          />
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-400/60 rounded-r-full hover:bg-blue-400/100"
          >
            <FontAwesomeIcon className="text-white pr-1 " icon={faPaperPlane} />
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-end">
          <button>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => setIsInputVisible(true)}
              className="text-white h-6 w-6 bg-blue-400/60 py-4 px-4 rounded-full hover:bg-blue-400/100 transform transition-transform duration-300 hover:scale-110"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
