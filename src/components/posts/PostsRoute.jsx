import { Route } from 'react-router'
import Posts from './Posts'
import PostList from './PostList'
import PostDetail from './PostDetail'
import NewPost from '../NewPost'

const PostsRoute = (
  <Route path='posts' element={<Posts />}>
    <Route index element={<PostList />} />
    <Route path='new' element={<NewPost />} />
    <Route path=':id' element={<PostDetail />} />
  </Route>
)

export default PostsRoute
