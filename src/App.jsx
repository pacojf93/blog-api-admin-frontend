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
        {user ? (
          <div>
            <span className='me-4'>{user.username}</span>
            <Link to='log-out'>Log out</Link>
          </div>
        ) : (
          <Link to='log-in'>Log in</Link>
        )}

        <Outlet context={{ user, setUser, navigate }} />
      </div>
    </>
  )
}

export default App
