import React from "react";
import {Link, NavLink} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const activeStyles = {color: '#65a30d'}

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из аккаунта')
    }

    return (
        <div className='flex py-4 justify-between items-center'>
        <span className='flex justify-center items-center w-[100px] h-6 bg-stone-900 text-ls italic text-orange-100 rounded-sm'>
            Abooukt
        </span>
        {isAuth && (
        <ul className='flex gap-8'>
            <li>
                <NavLink to={'/'} href = '/' className='text-xs text-stone-900 hover:text-stone-400' style={({isActive})=>isActive? activeStyles : undefined}> Главная</NavLink>
            </li>
            <li>
                <NavLink to={'/posts'} href = '/'  className='text-xs text-stone-900 hover:text-stone-400'style={({isActive})=>isActive? activeStyles : undefined}> Мои публикации</NavLink>
            </li>
            <li>
                <NavLink to={'/new'} href = '/' className='text-xs text-stone-900  hover:text-stone-400'style={({isActive})=>isActive? activeStyles : undefined}> Создать публикацию </NavLink>
            </li>
        </ul>
        )}
        
        <div className='flex justify-center items-center bg-stone-900 text-xs text-orange-100 rounded-sm px-4 py-2'>
            {isAuth?(<button onClick={logoutHandler}>Выйти</button>):(<Link to={'/login'}>Войти</Link>)}
        </div>
    </div>
    )
}

