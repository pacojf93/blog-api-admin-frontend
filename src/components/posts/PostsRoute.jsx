import { Route } from 'react-router'
import Posts from './Posts'
import PostList from './PostList'
import PostDetail from './PostDetail'
import NewPost from '../NewPost'
import PostEditor from './PostEditor'
import DeletePost from './DeletePost'

const PostsRoute = (
  <Route path='posts' element={<Posts />}>
    <Route index element={<PostList />} />
    <Route path='new' element={<NewPost />} />
    <Route path=':id' element={<PostDetail />} />
    <Route path=':id/edit' element={<PostEditor />} />
    <Route path=':id/delete' element={<DeletePost />} />
  </Route>
)

export default PostsRoute
