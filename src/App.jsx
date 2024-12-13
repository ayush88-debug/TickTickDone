
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {


  return (
    <>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo App</h1>
      <TodoForm />
      <TodoItem/>
    </div>
    </>
  )
}

export default App
