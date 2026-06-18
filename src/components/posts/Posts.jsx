import { Link, Outlet } from 'react-router'
import { useContext } from 'react'
import { BlogContext } from '../../App'

const Posts = () => {
  const { user } = useContext(BlogContext)

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

      <Outlet />
    </>
  )
}

export default Posts
