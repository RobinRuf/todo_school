"use client"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Input = () => {
    const [input, setInput] = useState('');
    const [startDate, setStartDate] = useState(null);

    const handleCreateToDo = () => {

    fetch("http://localhost:3000/api/firestore/createUser", {
      method: "POST",
      body: JSON.stringify({
        name: session?.user?.name,
        image: session?.user?.image,
        email: session?.user?.email,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).catch((e) => console.log(e));
    }

    return (
        <div className="fixed bottom-10 w-full flex justify-center">
            <div className="flex w-full max-w-3xl mx-auto">
            <div className="flex items-center px-4 bg-gray-800 rounded-l-full">
    <FontAwesomeIcon 
        className='text-white pr-2' 
        icon={faCalendarAlt} 
        onClick={() => document.getElementById("datepicker").focus()} 
    />
    <DatePicker
        id="datepicker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="bg-gray-800 text-white w-24"
        placeholderText=""
    />
</div>

                <input 
                    type="text" 
                    className="flex-grow p-2 pl-4 bg-gray-800 text-white border-l border-gray-600"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button 
                    className="px-4 py-2 bg-blue-400/60 rounded-r-full hover:bg-blue-400/100"
                    onClick={handleCreateToDo}
                >
                    <FontAwesomeIcon className='text-white pr-1' icon={faPaperPlane} />
                </button>
            </div>
        </div>
    )
}

export default Input;

