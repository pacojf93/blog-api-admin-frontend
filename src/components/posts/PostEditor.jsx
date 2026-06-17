import { useState, useRef, useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router'
import Tinymce from './Tinymce'

const savePost = (post, user, content) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    headers: headers,
    body: new URLSearchParams({
      id: post.id,
      title: post.title,
      content: content,
    }),
  })
    .then((response) => response.json())
    .then((res) => console.log(res))
}

const PostEditor = () => {
  const { id } = useParams()
  const { user, navigate } = useOutletContext()
  const [post, setPost] = useState(null)
  const [content, setContent] = useState('')
  const editorRef = useRef(null)

  useEffect(() => {
    fetch(`/api/posts/${id}`, {})
      .then((res) => res.json())
      .then((res) => {
        setPost(res)
        setContent(res.content)
      })
  }, [id])

  return (
    <>
      {post ? (
        <>
          <div className='mt-5'>
            <Tinymce
              editorRef={editorRef}
              initialValue={post.content}
              setContent={setContent}
            />
          </div>

          <button
            onClick={() => {
              savePost(post, user, content)
              navigate(-1)
            }}
            className='mt-5 btn btn-outline-primary'
          >
            Save editor content
          </button>
          <div className='mt-5'>
            <h2>Preview</h2>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className='mt-5'
            />
          </div>
        </>
      ) : (
        <p>no post available</p>
      )}
    </>
  )
}

export default PostEditor
