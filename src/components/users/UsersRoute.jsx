import { Route } from 'react-router'
import Users from './Users'
import UserList from './UserList'
import UserDetail from './UserDetail'
import NewUser from './NewUser'

const UsersRoute = (
  <Route path='users' element={<Users />}>
    <Route index element={<UserList />} />
    <Route path='new' element={<NewUser />} />
    <Route path=':id' element={<UserDetail />} />
  </Route>
)

export default UsersRoute
