import About from "../components/pages/About";
import PostIdPages from "../components/pages/PostIdPages";
import Posts from "../components/pages/Posts";

const routes = [
    {path: '/about', component: <About/>, exact: true},
    {path: '/posts', component: <Posts/>, exact: true},
    {path: '/posts/:id', component: <PostIdPages/>, exact: true}
]

export default routes;