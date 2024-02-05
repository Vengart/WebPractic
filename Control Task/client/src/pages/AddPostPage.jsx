import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../redux/features/post/postSlice.js'
import { useNavigate } from 'react-router-dom'

export const AddPostPage = () => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/')
        }catch(error){
            console.log(error)
        }
    }
    const clearFormHandler = () => {
        setText('')
        setTitle('')
    }

    return (
        <form className='w-1/3 mx-auto py-10' onSubmit={(e) => e.preventDefault()}>
            <label className='text-lime-600 py-2 bg-stone-900 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                Прикрепить изорбажение:
                <input type='file' className='hidden' onChange={(e) => setImage(e.target.files[0])}/> 
            </label >
            <div className='flex object-cover py-2'>
                {image && (
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                )}
            </div>

            <label className='text-xs text-stone-900'>
                Заголовок поста:
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Заголовок'
                    className='mt-1 text-orange-100 w-full rounded-lg bg-stone-900 border py-1 px-2 text-xs outline-none placeholder:text-orange-100'
                />
            </label>

            <label className='text-xs text-stone-900'>
                Текст поста:
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Текст поста'
                    className='mt-1 text-orange-100 w-full rounded-lg bg-stone-900 border py-1 px-2 text-xs outline-none resize-none h-56 placeholder:text-orange-100'
                />
            </label>

            <div className='flex gap-8 items-center justify-center mt-4'>
                <button
                    onClick={submitHandler}
                    className='flex justify-center items-center bg-stone-900 text-xs text-white rounded-lg py-2 px-4'
                >
                    Добавить
                </button>

                <button
                    onClick={clearFormHandler}
                    className='flex justify-center items-center bg-red-500 text-xs text-white rounded-lg py-2 px-4'
                >
                    Отменить
                </button>
            </div>
        </form>
    )
}
