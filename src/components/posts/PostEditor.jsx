import { useState, useRef, useEffect } from 'react'
import { useOutletContext, useParams, Link } from 'react-router'
import Tinymce from './Tinymce'

const saveEditedFields = (id, user, title, abstract, content) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: headers,
    body: new URLSearchParams({
      id: id,
      title: title,
      abstract: abstract,
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

const publishPost = (id, user, post, setPost) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/posts/${id}/publish`, {
    method: 'PUT',
    headers: headers,
  })
    .then((response) => response.json())
    .then((res) => {
      setPost({ ...post, isPublished: true })
      console.log(res)
    })
}

const unpublishPost = (id, user, post, setPost) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch(`/api/posts/${id}/hide`, {
    method: 'PUT',
    headers: headers,
  })
    .then((response) => response.json())
    .then((res) => {
      setPost({ ...post, isPublished: false })
      console.log(res)
    })
}

const PostEditor = () => {
  const { id } = useParams()
  const { user, navigate } = useOutletContext()
  const [post, setPost] = useState(null)
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')
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
        setTitle(res.title)
        setAbstract(res.abstract)
      })
    fetch(`/api/posts/${id}/tags`, {})
      .then((res) => res.json())
      .then((res) => {
        setPostTags(res)
      })
    fetch(`/api/posts/${id}/comments`, {})
      .then((res) => res.json())
      .then((res) => {
        setComments(res)
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
      <>
        <h2 className='mt-5'>Edit post fields</h2>
        <>
          <h3 className=''>Title</h3>
          {title ? (
            <>
              <input
                type='text'
                className='form-control'
                id='name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </>
          ) : (
            <>
              <p>no title available</p>
            </>
          )}
        </>

        <>
          <h3 className='mt-5'>Abstract</h3>
          {abstract ? (
            <>
              <input
                type='text'
                className='form-control'
                id='name'
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
              />
            </>
          ) : (
            <>
              <p>no abstract available</p>
            </>
          )}
        </>

        <>
          <h3 className='mt-5'>Content</h3>
          {content ? (
            <>
              <div className=''>
                <Tinymce
                  editorRef={editorRef}
                  initialValue={content}
                  setContent={setContent}
                />
              </div>

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
        </>

        <button
          onClick={() => {
            saveEditedFields(id, user, title, abstract, content)
            navigate(-1)
          }}
          className='mt-5 btn btn-outline-primary'
        >
          Save edited fields
        </button>
      </>

      <>
        <h2 className='mt-5'>Edit tags</h2>
        {postTags ? (
          <>
            <h3 className=''>Related tags</h3>
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
      <>
        <h2 className='mt-5'>Edit visibility</h2>
        {post ? (
          <>
            {post.isPublished ? (
              <>
                <p>Users can view this post</p>
                <button
                  className='btn btn-outline-primary'
                  onClick={() => unpublishPost(id, user, post, setPost)}
                >
                  unpublish
                </button>
              </>
            ) : (
              <>
                <p>Users can't view this post</p>
                <button
                  className='btn btn-outline-primary'
                  onClick={() => publishPost(id, user, post, setPost)}
                >
                  publish
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <p>no post available</p>
          </>
        )}
      </>
    </>
  )
}

export default PostEditor
