import { Route } from 'react-router'
import DeleteComment from './DeleteComment'

const CommentsRoute = (
  <Route path='comments'>
    <Route path=':id/delete' element={<DeleteComment />} />
  </Route>
)

export default CommentsRoute
