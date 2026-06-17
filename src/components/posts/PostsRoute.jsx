import { Route } from 'react-router'
import Posts from './Posts'
import PostList from './PostList'
import PostDetail from './PostDetail'
import PostEditor from './PostEditor'

const PostsRoute = (
  <Route path='posts' element={<Posts />}>
    <Route index element={<PostList />} />
    <Route path='new' element={<h1>nu post</h1>} />
    <Route path=':id' element={<PostDetail />} />
    <Route path=':id/edit' element={<PostEditor />} />
  </Route>
)

export default PostsRoute
