import { userService } from '../../services/user.service.js'
import { SET_USER, SET_USER_SCORE, store, } from '../store.js'

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}


export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}

export function updateScore(diff) {
    return userService.updateScore(-diff)
        .then(newScore => {
            store.dispatch({ type: SET_USER_SCORE, score: newScore })
            store.dispatch({ type: TOGGLE_CART_IS_SHOWN })
            store.dispatch({ type: CLEAR_CART })
            return newScore
        })
        .catch((err) => {
            console.log('user actions -> Cannot update score', err)
            throw err
        })
}

export function getEmptyCredentials() {
    return userService.getEmptyCredentials()
}