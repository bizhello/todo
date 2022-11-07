import React from "react"
import MyButton from "./UI/button/MyButton"
import { useNavigate } from "react-router-dom";

const PostItem = (props)=> {

    let navigate = useNavigate();
    
    const removePost = ()=> {
        props.remove(props.post)
    }
    
    const openPost = ()=> {
        navigate(`/posts/${props.post.id}`)
    }
    
    return(
        <div className="post">
            <div className="post__container">
                <strong>{props.post.id}. {props.post.title}</strong>
            <div>
                {props.post.body}
            </div>
            </div>
            <div className="post__btn">
                <MyButton onClick={openPost}>Открыть</MyButton>
                <MyButton onClick={removePost}>Удалить</MyButton>
            </div>
        </div>  
    )
}

export default PostItem