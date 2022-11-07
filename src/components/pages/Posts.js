import React, { useState, useEffect, useRef } from "react";
import PostList from "../PostList";
import PostForm from "../PostForm";
import PostFilter from "../PostFilter";
import MyModal from "../UI/MyModal/MyModal"
import MyButton from "../UI/button/MyButton";
import Loader from '../UI/Loader/Loader'
import usePosts from "../../hooks/usePost"
import useFetching from '../../hooks/useFetching'
import PostService from '../../API/PostService'
import useObserver from "../../hooks/useObserver";

import { getPageCount, getPagesArray } from '../../utils/pages'
import Pagination from "../UI/pagination/Pagination";
import MySelect from "../UI/select/MySelect";

function Posts() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef()
    

    const sortedAndSearchedSort = usePosts(posts, filter.sort, filter.query)

    const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, ()=> {
        setPage(page+1)
    })

    useEffect( ()=> {
      fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost)=> {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (post)=> {
        setPosts(posts.filter(item => item.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={()=> setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm createPost={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect 
                value={limit}
                onChange={value=> setLimit(value)}
                defaultValue='Кол-во элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}

            />
            {
                postError && <div>ПРОИЗОШЛА ОШИБКА</div>
            }
            <PostList posts={sortedAndSearchedSort} remove={removePost} title='Список постов'/>
            <div ref={lastElement} style={{height:'20px', background: 'red'}}/>
            {
              isPostsLoading &&
                 <div style={{display:'flex', justifyContent:'center', marginTop: '50px'}}><Loader /></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
