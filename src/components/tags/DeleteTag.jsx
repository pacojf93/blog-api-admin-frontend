import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router'

const deleteTag = (id, user) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/tags/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then((response) => response.json())
    .then((res) => console.log(res))
}

const DeleteTag = () => {
  const { id } = useParams()
  const { user, navigate } = useOutletContext()
  const [tag, setTag] = useState(null)

  useEffect(() => {
    fetch(`/api/tags/${id}`, {})
      .then((res) => res.json())
      .then((res) => {
        setTag(res)
      })
  }, [id])

  return (
    <>
      {tag ? (
        <>
          <h1 className='mt-5'>{`Delete the tag named '${tag.name}'?`}</h1>
          <button
            onClick={() => {
              deleteTag(id, user)
              navigate('tags')
            }}
            className='mt-5 btn btn-outline-primary'
          >
            Confirm delete
          </button>
        </>
      ) : (
        <>tag not available</>
      )}
    </>
  )
}

export default DeleteTag
