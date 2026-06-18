import { useParams, Link } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import CommentForm from './CommentForm'
import { BlogContext } from '../../App'

const leaveAComment = (user, id, content, comments, setComments) => {
  fetch(`/api/comments/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: new URLSearchParams({
      content: content,
    }),
  })
    .then((res) => res.json())
    .then((c) => setComments([...comments, c]))
}

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState(null)
  const [tags, setTags] = useState(null)
  const { user, setUser } = useContext(BlogContext)

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((res) => setPost(res))
    fetch(`/api/posts/${id}/comments`)
      .then((res) => res.json())
      .then((res) => setComments(res))
    fetch(`/api/posts/${id}/tags`)
      .then((res) => res.json())
      .then((res) => setTags(res))
  }, [])

  return (
    <>
      {post ? (
        <div>
          <h2 className='my-4'>{post.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className='mt-4'
          />
        </div>
      ) : (
        <p>post not available</p>
      )}
      {comments ? (
        <>
          <h3 className='mt-5'>Comments</h3>
          {comments.map((c) => (
            <div className='card mt-2'>
              <div className='card-body'>
                <h4 className='card-title'>{c.user.username}</h4>
                <p className='card-text'>{c.content}</p>
                {user ? (
                  <p className='card-text'>
                    <Link to={`/comments/${c.id}/delete`}>Delete</Link>
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>this post has no comments</p>
      )}
      {user ? (
        <CommentForm
          leaveAComment={(content) =>
            leaveAComment(user, id, content, comments, setComments)
          }
        />
      ) : (
        <></>
      )}
      {tags ? (
        <>
          <h3 className='mt-5'>Tags</h3>
          {tags.map((t) => (
            <Link to={`/tags/${t.id}`}>
              <span className='badge rounded-pill text-bg-primary me-2 mt-2'>
                {t.name}
              </span>
            </Link>
          ))}
        </>
      ) : (
        <p>this post has no tags</p>
      )}
      {user ? (
        <div className='mt-5'>
          <Link to={`/posts/${id}/edit`} className='me-4'>
            Edit
          </Link>
          <Link to={`/posts/${id}/delete`} className='me-4'>
            Delete
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default PostDetail
