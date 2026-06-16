import { Route } from 'react-router'
import Tags from './Tags'
import NewTag from './NewTag'
import TaggedPosts from './TaggedPosts'
import TagList from './TagList'

const TagsRoute = (
  <Route path='tags' element={<Tags />}>
    <Route index element={<TagList />} />
    <Route path='new' element={<NewTag />} />
    <Route path=':id' element={<TaggedPosts />} />
  </Route>
)

export default TagsRoute
