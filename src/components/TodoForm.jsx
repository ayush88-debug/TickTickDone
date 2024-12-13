import { useState } from "react"
import { addTodo } from "../features/todo/todoSlice"
import { useDispatch } from "react-redux"




function TodoForm() {

  const dispatch=useDispatch()
  const [input,setInput]=useState("")
  const addTodos=(e)=>{
    e.preventDefault()
    if(input.trim()==""){
      alert("Enter valid Input")
    }
    else{
      dispatch(addTodo({text: input}))
      setInput("")
    }
  }
  return (
  <form onSubmit={addTodos} className="flex gap-2 mb-6">
    <input
      type="text"
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      placeholder="Add a new todo"
      className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Add
    </button>
  </form>
  )
}

export default TodoForm
