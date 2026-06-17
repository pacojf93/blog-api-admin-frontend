import { useState, useEffect } from 'react'
import { Link, useOutletContext } from 'react-router'

const User = ({ username, id }) => (
  <div className='mt-2 card'>
    <div className='card-body'>
      <h3 className='mt-2 card-title'>
        <Link to={`/users/${id}`}>{username}</Link>
      </h3>
    </div>
  </div>
)

const UserList = () => {
  const [users, setUsers] = useState(null)
  const { user } = useOutletContext()

  useEffect(() => {
    const headers =
      user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

    fetch('/api/users', {
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => setUsers(res))
  }, [user])

  return (
    <>
      {users ? (
        <ul className='mt-4'>
          {users.map((user) => (
            <User key={user.id} username={user.username} id={user.id} />
          ))}
        </ul>
      ) : (
        <h1>no users available</h1>
      )}
    </>
  )
}

export default UserList
