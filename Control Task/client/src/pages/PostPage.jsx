import React from "react";
import { useState } from "react"
import { AiFillEye, AiOutlineMessage, AiFillDelete, AiTwotoneEdit } from 'react-icons/ai'
import { useCallback } from 'react'
import moment from 'moment';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from '../utils/axios'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import { removePost } from "../redux/features/post/postSlice";
import { createComment, getPostComments } from "../redux/features/comment/commentSlice";
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
    // const post = 'res'
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const params = useParams()

    const {user} = useSelector((state) => state.auth)
    const {comments} = useSelector((state) => state.comment)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const removePostHandler = () => {
        try{
            dispatch(removePost(params.id))
            toast('Публикация удалена')
            navigate('/posts')
        }catch(error){
            console.log(error)
        }
    }

    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({ postId, comment }))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])
    

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    if (!post) {
        return (
            <div className='text-xl text-center text-stone-900 py-10'>
                Секундочку...
            </div>
        )
    }

    return (        
    <div>
      <div>
        <button className='flex justify-center items-center bg-stone-900 text-xs text-orange-100 rounded-sm py-2 px-4 hover:text-lime-600'>
            <Link className='flex' to={'/'}>
                Назад
            </Link>
        </button>
      </div>
      <div className='flex gap-10 py-8 flex-col justify-center items-center'>
        <div classname='flex flex-col'>
            <div className='flex flex-col flex-grow'>
                <div
                    className={post?.imgUrl? 'flex rounded-sm h-auto': 'flex rounded-sm'}>
                    {post?.imgUrl && (
                        <img src={`http://localhost:3002/${post.imgUrl}`} alt='img' className='object-cover w-96'/>
                    )}
                </div>
            </div>
            <div className='flex justify-between items-center pt-2'>
                <div className='text-xs text-stone-900'>{post.usename}</div>
                <div className='text-xs text-stone-900'>
                    {moment(post.createdAt).format("MM/DD/YYYY")}
                </div>
            </div>
            <div className='text-stone-900 text-xl'>{post.title}</div>
            <p className='text-stone-900 text-xs pt-4 line-clamp-4'>{post.text}</p>

            <div className='flex gap-3 items-center mt-2 justify-between'>
                <div className='flex gap-3 mt-4'>
                    <button className='flex items-center justify-center gap-2 text-xs text-stone-900'>
                        <AiFillEye /> 
                        <span>{post.views}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-xs text-stone-900'>
                        <AiOutlineMessage />
                        <span>{post.comment?.length || 0}</span>
                    </button>
                </div>
                {user?._id === post.author && (
                    <div className='flex gap-3 mt-4'>
                        <button className='flex items-center justify-center gap-2 text-stone-950'>
                            <Link to={`/${params.id}/edit`}>
                                <AiTwotoneEdit />
                            </Link>
                        </button>
                        <button
                            onClick={removePostHandler}
                            className='flex items-center justify-center gap-2  text-stone-950'
                        >
                            <AiFillDelete />
                        </button>
                    </div>
                )}
            </div>
            <div className='p-8 flex flex-col gap-2 rounded-sm'>
                    <form
                        className='flex gap-2'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Комментарий'
                            className='text-stone-900 w-full rounded-sm bg-orange-100 border-2 border-lime-900 p-2 text-xs outline-none placeholder:text-stone-500'
                        />
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='flex justify-center items-center bg-stone-900 text-xs text-orange-100 rounded-sm py-2 px-4 hover:text-lime-600'
                        >
                            Отправить
                        </button>
                    </form>


                    {Array.isArray(comments) && comments.map((cmt) => (
                       <CommentItem key={cmt._id} cmt={cmt} />
                    ))}
                </div>
        </div>
      </div>
    </div>    
    )
}