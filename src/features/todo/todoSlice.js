import {createSlice, nanoid} from "@reduxjs/toolkit"

const getLocalData=()=>{
    const res=localStorage.getItem("todos")
    const data=JSON.parse(res)
    return data ? data : []
}


const initialState={
    todos:getLocalData()
}

const todoSlice=createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const newTodo={
                id:nanoid(),
                text:action.payload.text,
                completed:false,
                editing:false
            }
            state.todos.push(newTodo)

        },

        updatetodo:(state,action)=>{
            const newList=state.todos.map((item)=> ((item.id == action.payload.id) ? {...item , text:action.payload.text } : item ))
            state.todos=newList
        },

        deleteToto:(state,action)=>{
            const newList =state.todos.filter((item)=>( item.id != action.payload.id))
            state.todos=newList
        },

        toggleTodo:(state,action)=>{
            const newList=state.todos.map((item) => ( item.id == action.payload.id ? {...item , completed:!(item.completed)} : item))
            state.todos=newList
        },

        toggleEditing:(state,action)=>{
            const newList=state.todos.map((item) => ( item.id == action.payload.id ? {...item , editing:!(item.editing)} : item))
            state.todos=newList
        }
    }
})

export default todoSlice.reducer

export const {addTodo, updatetodo, deleteToto, toggleTodo,toggleEditing }=todoSlice.actions