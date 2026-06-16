import { Link, useOutletContext, Outlet } from 'react-router'

const Users = () => {
  const { user, navigate } = useOutletContext()

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
