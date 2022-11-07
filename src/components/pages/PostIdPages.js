import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import PostService from "../../API/PostService";
import useFetching from '../../hooks/useFetching'
import Loader from '../UI/Loader/Loader'

const PostIdPages = ()=> {

    let { id } = useParams()

    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isLoading, error] = useFetching(async ()=> {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async ()=> {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })

    useEffect(()=>{
        fetchPostById(id);
        fetchComments(id);
    },[])
    
    return(
        <div className="post__id">  
            {
            isLoading 
            ?
            <Loader />
            :
            <div>
                <h1>Страница поста c id {id}</h1>
                <p>{post.title}</p>
            </div>
            }
            <h1>Комментарии</h1>
            {isComLoading
                ? <Loader />
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop:'20px'}}>
                            <h4>{comm.email}</h4>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>}

        </div>
    )
}

export default PostIdPages



