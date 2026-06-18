import { Outlet, Link, useNavigate } from 'react-router'
import { useState } from 'react'

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  return (
    <>
      <div className='container'>
        <Link to='/'>
          <h1 className='my-4'>Blog api admin frontend</h1>
        </Link>

        <div className='d-flex alig-items-center justify-content-between'>
          <div className=''>
            <Link to='/posts' className='me-4'>
              Posts
            </Link>
            <Link to='/users' className='me-4'>
              Users
            </Link>
            <Link to='/tags' className='me-4'>
              Tags
            </Link>
          </div>

          <div>
            {user ? (
              <>
                <span className='me-4'>{user.username}</span>
                <Link to='log-out'>Log out</Link>
              </>
            ) : (
              <Link to='log-in'>Log in</Link>
            )}
          </div>
        </div>

        <Outlet context={{ user, setUser, navigate }} />
      </div>
    </>
  )
}

export default App
