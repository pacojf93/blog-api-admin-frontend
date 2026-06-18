import { useState, useRef, useEffect } from 'react'
import { useOutletContext, useParams, Link } from 'react-router'
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

const addTag = (postId, tagId, user, setPostTags) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/posts/${postId}/tag`, {
    method: 'PUT',
    headers: headers,
    body: new URLSearchParams({
      tag: tagId,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      setPostTags(res.tags)
      console.log(res)
    })
}

const removeTag = (postId, tagId, user, setPostTags) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/posts/${postId}/untag`, {
    method: 'PUT',
    headers: headers,
    body: new URLSearchParams({
      tag: tagId,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      setPostTags(res.tags)
      console.log(res)
    })
}

const PostEditor = () => {
  const { id } = useParams()
  const { user, navigate } = useOutletContext()
  const [post, setPost] = useState(null)
  const [content, setContent] = useState('')
  const editorRef = useRef(null)
  const [postTags, setPostTags] = useState(null)
  const [otherTags, setOtherTags] = useState(null)

  useEffect(() => {
    fetch(`/api/posts/${id}`, {})
      .then((res) => res.json())
      .then((res) => {
        setPost(res)
        setContent(res.content)
      })
    fetch(`/api/posts/${id}/tags`, {})
      .then((res) => res.json())
      .then((res) => {
        setPostTags(res)
      })
  }, [id])

  useEffect(() => {
    fetch(`/api/tags`, {})
      .then((res) => res.json())
      .then((res) => {
        setOtherTags(res)
      })
  }, [])

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
          {/*           <div className='mt-5'>
            <h2>Preview</h2>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className='mt-5'
            />
          </div> */}
        </>
      ) : (
        <p>no post available</p>
      )}
      <h2 className='mt-5'>Edit tags</h2>
      {postTags ? (
        <>
          <h3 className='mt-5'>Related tags</h3>
          {postTags.map((t) => (
            <button
              onClick={() => removeTag(id, t.id, user, setPostTags)}
              className='badge rounded-pill text-bg-primary me-2 mt-2'
              title='remove tag'
            >
              {t.name}
            </button>
          ))}
        </>
      ) : (
        <p>this post has no tags</p>
      )}
      {otherTags && postTags ? (
        <>
          <h3 className='mt-5'>Unrelated tags</h3>
          {otherTags
            .filter((t) => !postTags.some((pt) => pt.id === t.id))
            .map((t) => (
              <button
                onClick={() => addTag(id, t.id, user, setPostTags)}
                className='badge rounded-pill text-bg-primary me-2 mt-2'
                title='add tag'
              >
                {t.name}
              </button>
            ))}
        </>
      ) : (
        <p>there is no tags available</p>
      )}
    </>
  )
}

export default PostEditor
