import { useContext } from 'react'
import { Link, Outlet } from 'react-router'
import { BlogContext } from '../../App'

const Users = () => {
  const { user, navigate } = useContext(BlogContext)

  return (
    <>
      <div>
        <Link to='' className='me-4'>
          List
        </Link>
        {user ? (
          <Link to='new' className='me-4'>
            New
          </Link>
        ) : (
          <></>
        )}
      </div>

      <Outlet context={{ user, navigate }} />
    </>
  )
}

export default Users
