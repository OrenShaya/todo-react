import { todoService } from '../../services/todo.service.js'
import { SET_TODOS, REMOVE_TODO, store } from '../store.js'

export function loadTodos(filterBy) {
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos: todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
}

export function getFilterFromSearchParams(searchParams) {
    return todoService.getFilterFromSearchParams(searchParams)
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(incomingTodo) {
    const type = incomingTodo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(incomingTodo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}