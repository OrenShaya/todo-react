import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, getFilterFromSearchParams, removeTodo, saveTodo } from "../store/action/todo.actions.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoIndex() {

    const [_todos, setTodos] = useState(null)
    const todos = useSelector(storeState => storeState.todos)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = getFilterFromSearchParams(searchParams)
    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
    }, [filterBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }

    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}