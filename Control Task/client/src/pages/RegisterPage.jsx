import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector} from "react-redux";
import { registerUser, checkIsAuth } from "../redux/features/auth/authSlice";
// import {toast} from "react-toastify"

export const RegisterPage = () => {
    const [username,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const { status } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)

    useEffect(()=>{
        if(status){
            //toast(status)
        }
        if(isAuth) navigate('/')    
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try{
            dispatch(registerUser({username, password}))
            setPassword('')
            setUserName('')
        }catch(error){
            console.log(error)

        }
    }
    return (
        <form onSubmit={e => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40'>
            <h1 className='text-lg text-lime-600 text-center'>
                Регистрация
            </h1>
            <label className='text-xs text-stone-900'>
                Имя пользователя: 
                <input type = "Username" value={username} onChange={e => setUserName(e.target.value)} placeholder="Имя пользователя" className='mt-1 text-orange-100 w-full rounded-lg bg-stone-900 border py-1 px-2 text-xs outline-none placeholder:text-orange-200'>
                </input>
            </label>
            <br/>
            <label className='text-xs text-stone-900'>
                Пароль: 
                <input type = "Password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" className='mt-1 text-orange-100 w-full rounded-lg bg-stone-900 border py-1 px-2 text-xs outline-none placeholder:text-orange-200'>
                </input>
            </label>
            <div className='flex gap-8 justify-center mt-4'>
                <button type = "submit" onClick={handleSubmit} className='flex justify-center items-center text-xs bg-stone-900 text-orange-200 rounded-lg py-2 px-4'>
                    Создать аккаунт
                </button>
                <Link to='/login' className='flex justify-center items-center text-xs text-lime-600'>Войти в аккаунт</Link>
            </div>
        </form>
    )
}