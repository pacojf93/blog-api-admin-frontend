import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router'

const deleteComment = (id, user) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/comments/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then((response) => response.json())
    .then((res) => console.log(res))
}

const DeleteComment = () => {
  const { id } = useParams()
  const { user, navigate } = useOutletContext()
  const [comment, setComment] = useState(null)

  useEffect(() => {
    fetch(`/api/comments/${id}`, {})
      .then((res) => res.json())
      .then((res) => {
        setComment(res)
      })
  }, [id])

  return (
    <>
      {comment ? (
        <>
          <h1 className='mt-5'>{'Delete this comment?'}</h1>
          <div className='card mt-2'>
            <div className='card-body'>
              <h4 className='card-title'>{comment.user.username}</h4>
              <p className='card-text'>{comment.content}</p>
            </div>
          </div>
          <button
            onClick={() => {
              deleteComment(id, user)
              navigate(-1)
            }}
            className='mt-5 btn btn-outline-primary'
          >
            Confirm delete
          </button>
        </>
      ) : (
        <>no comment available</>
      )}
    </>
  )
}

export default DeleteComment
