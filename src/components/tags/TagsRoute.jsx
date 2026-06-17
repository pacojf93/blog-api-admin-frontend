import { Route } from 'react-router'
import Tags from './Tags'
import NewTag from './NewTag'
import TagDetail from './TagDetail'
import TagList from './TagList'
import DeleteTag from './DeleteTag'

const TagsRoute = (
  <Route path='tags' element={<Tags />}>
    <Route index element={<TagList />} />
    <Route path='new' element={<NewTag />} />
    <Route path=':id' element={<TagDetail />} />
    <Route path=':id/delete' element={<DeleteTag />} />
  </Route>
)

export default TagsRoute
