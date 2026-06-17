import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router'

const deleteUser = (id, user) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then((response) => response.json())
    .then((res) => console.log(res))
}

const DeleteUser = () => {
  const { id } = useParams()
  const { user, navigate } = useOutletContext()
  const [deletedUser, setDeletedUser] = useState(null)

  useEffect(() => {
    const headers =
      user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

    fetch(`/api/users/${id}`, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        setDeletedUser(res)
      })
  }, [id, user])

  return (
    <>
      {deletedUser ? (
        <>
          <h1 className='mt-5'>{`Delete the user named '${deletedUser.username}'?`}</h1>
          <button
            onClick={() => {
              deleteUser(id, user)
              navigate('')
            }}
            className='mt-5 btn btn-outline-primary'
          >
            Confirm delete
          </button>
        </>
      ) : (
        <>user not available</>
      )}
    </>
  )
}

export default DeleteUser
