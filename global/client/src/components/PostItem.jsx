import React from "react";
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
// import { Moment } from 'react-moment'
import moment from 'moment';
import { Link } from "react-router-dom";

export const PostItem = ({post}) => {
    if (!post) {
        return (
            <div className='text-xl text-center text-stone-900 py-10'>
                ...
            </div>
        )
    }
    return (
        <Link to = {`/${post._id}`}>
            <div className='flex flex-col basis-1/4 flex-grow'>
                <div
                className={
                    post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'
                }>
                    {post.imgUrl &&(<img src={`http://localhost:3002/${post.imgUrl}`} alt="img" className="object-cover w-full"></img>)}
                </div>
                <div className='flex justify-between items-center pt-2'>
                    <div className='text-xs text-bg-orange-100 '>{post.usename}</div>
                    <div className='text-xs text-bg-orange-100 '>
                        {moment(post.createdAt).format("MM/DD/YYYY")}
                    </div>
                </div>
                <div className='text-stone-900 text-xl'>{post.title}</div>
                <p className='text-stone-900 text-xs pt-4 line-clamp-4'>{post.text}</p>

                <div className='flex gap-3 items-center mt-2'>
                    <button className='flex items-center justify-center gap-2 text-xs text-stone-900'>
                        <AiFillEye /> <span>{post.views}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-xs text-stone-900'>
                        <AiOutlineMessage />{' '}
                        <span>{post.comment?.length || 0}</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}