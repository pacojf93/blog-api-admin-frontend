import { useParams, Link } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import { BlogContext } from '../../App'

const TagDetail = () => {
  const { id } = useParams()
  const [posts, setPosts] = useState(null)
  const { user } = useContext(BlogContext)

  useEffect(() => {
    fetch(`/api/tags/${id}/posts`)
      .then((res) => res.json())
      .then((res) => setPosts(res))
  }, [id])

  return (
    <>
      {posts ? (
        <>
          <h3 className='mt-5'>Tagged Posts</h3>
          {posts.map((p) => (
            <div className='card mt-2'>
              <div className='card-body'>
                <Link to={`/posts/${p.id}`}>
                  <h4 className='card-title'>{p.title}</h4>
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>This tag has no tagged posts</p>
      )}
      {user ? (
        <div className='mt-5'>
          <Link to={`/tags/${id}/delete`} className='me-4'>
            Delete
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default TagDetail
