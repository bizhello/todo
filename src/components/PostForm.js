import React,{useState, createRef} from "react";
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton'; 

const PostForm = ({createPost})=> {

    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e)=> {
        e.preventDefault();
        createPost({...post, id: Date.now()})
        setPost({title: '', body: ''})
    }

    return(
        <form>
            <MyInput 
                type='text'
                placeholder='Название поста'
                value = {post.title}
                onChange = {e=> setPost({...post, title: e.target.value})}
            />
            <MyInput
                type='text'
                placeholder='Описание поста'
                value = {post.body}
                onChange = {e=> setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    )
}

export default PostForm