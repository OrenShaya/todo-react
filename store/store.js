import { userService } from '../services/user.service.js'

const { createStore, } = Redux

const initialState = {
    todos: [],
    countedTodo: 0,
    loggedInUser: userService.getLoggedinUser() || userService.getEmptyCredentials(),
}

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

//* Todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_COUNT_TODO = 'SET_COUNT_TODO'

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        //* Todos
        case SET_TODOS:
            return {...state, todos: cmd.todos}
        case ADD_TODO:
            return {...state, todos: [...state.todos, cmd.todo]}
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter(todo => todo._id !== cmd.todoId)}
        case UPDATE_TODO:
            return {...state, todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo)}

        //* User
        case SET_USER:
            return { ...state, loggedInUser: cmd.user }
        case SET_USER_SCORE:
            const loggedInUser = { ...state.loggedInUser, score: cmd.score }
            return { ...state, loggedInUser }
        
        //* Completed ToDo
        case SET_COUNT_TODO:
            return {...state, countedTodo: (state.todos.filter((todo) => todo.isDone).length / state.todos.length).toFixed(2).length}

       default:
            return state
    }
}

export const store = createStore(appReducer)