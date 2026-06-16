import { useParams, useOutletContext, Link } from 'react-router'
import { useState, useEffect } from 'react'

const TaggedPosts = () => {
  const { id } = useParams()
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetch(`/api/tags/${id}/posts`)
      .then((res) => res.json())
      .then((res) => setPosts(res))
  }, [posts])

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
    </>
  )
}

export default TaggedPosts
