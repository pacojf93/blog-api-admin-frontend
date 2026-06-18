import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router'

const deletePost = (id, user) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then((response) => response.json())
    .then((res) => console.log(res))
}

const DeletePost = () => {
  const { id } = useParams()
  const { user, navigate } = useOutletContext()
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`/api/posts/${id}`, {})
      .then((res) => res.json())
      .then((res) => {
        setPost(res)
      })
  }, [id])

  return (
    <>
      {post ? (
        <>
          <h1 className='mt-5'>{`Delete the post titled '${post.title}'?`}</h1>
          <button
            onClick={() => {
              deletePost(id, user)
              navigate('/')
            }}
            className='mt-5 btn btn-outline-primary'
          >
            Confirm delete
          </button>
        </>
      ) : (
        <>no post available</>
      )}
    </>
  )
}

export default DeletePost
