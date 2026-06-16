import { useParams, useOutletContext, Link } from 'react-router'
import { useState, useEffect } from 'react'

const UserDetail = () => {
  const { id } = useParams()
  const [detailedUser, setDetailedUser] = useState(null)
  //const [posts, setPosts] = useState(null)
  const [comments, setComments] = useState(null)
  const { user, setUser } = useOutletContext()

  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  useEffect(() => {
    fetch(`/api/users/${id}`, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => setDetailedUser(res))
    fetch(`/api/users/${id}/comments`, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => setComments(res))
  }, [])

  return (
    <>
      {detailedUser ? (
        <div>
          <h2 className='my-4'>{detailedUser.username}</h2>
          <p className='mt-4'>
            {detailedUser.username +
              (detailedUser.isAdmnin
                ? ' has admin privileges'
                : ' has not admin privileges')}
          </p>
        </div>
      ) : (
        <p>user not available</p>
      )}
      {comments ? (
        <>
          <h3 className='mt-5'>Comments</h3>
          {comments.map((c) => (
            <div className='card mt-2'>
              <div className='card-body'>
                <p className='card-text'>{c.content}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>This user has no comments</p>
      )}
    </>
  )
}

export default UserDetail
