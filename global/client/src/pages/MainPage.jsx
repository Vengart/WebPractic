import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'


export const MainPage = () => {
//     return <div>MainPage</div>}
    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector((state) => state.post)

    console.log(popularPosts)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        return (
            <div className='text-xl text-center text-stone-900 py-10'>
                Публикаций пока нет
            </div>
        )
    }
    return (
        <div className='max-w-[600px] mx-auto py-10'>
            <div className='gap-8'>
                <div className='text-xs uppercase text-stone-900'>
                    Популярное:
                </div>
                <div className='flex flex-row max-h-14 py-2 gap-2 '>
                    {popularPosts?.map((post, idx) => (<PopularPosts key={idx} post={post}></PopularPosts>))}
                </div>
            </div>
            <div className='flex flex-col w-45 gap-10'>
                {posts?.map((post, idx) => (
                    <PostItem key={idx} post={post} />
                ))}
            </div>
        </div>
    )
}


