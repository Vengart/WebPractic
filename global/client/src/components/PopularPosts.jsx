import React from 'react'
import { Link } from 'react-router-dom'

export const PopularPosts = ({ post }) => {
    return (
        <div className='flex-row bg-stone-900 my-1'>
            <Link
                to={`${post._id}`}
                className='flex text-xs p-2 text-orange-100 hover:bg-stone-900  hover:text-lime-600'
            >
                {post.title}
            </Link>
        </div>
    )
}