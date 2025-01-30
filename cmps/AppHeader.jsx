const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'

import { store, SET_COUNT_TODO } from '../store/store.js'
import { logout } from '../store/action/user.actions.js'


export function AppHeader() {
    const navigate = useNavigate()
    const { useSelector } = ReactRedux
    const user = useSelector(storeState => storeState.loggedInUser)
    let countedTodo = useSelector(storeState => storeState.countedTodo)
    store.dispatch({ type: SET_COUNT_TODO })
    
    function onLogout() {
        logout()
        .catch((err) => {
            console.log(err)
            showErrorMsg('OOPs try again')
        })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Todo Now</h1>
                {user ? (
                    < section >
                        <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup onSetUser={store.loggedInUser} />
                    </section>
                )}
                <section className="todo-progress">
                    {countedTodo}% 
                </section>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
