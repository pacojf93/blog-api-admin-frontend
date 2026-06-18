import { useOutletContext } from 'react-router'
import { useEffect } from 'react'

const NewPost = () => {
  const { user, navigate } = useOutletContext()

  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  useEffect(() => {
    fetch('/api/posts', {
      method: 'POST',
      headers: headers,
      body: new URLSearchParams({
        title: 'New post',
        abstract: 'A new, un-edited post',
        content: 'Write some content here',
        userId: user.id,
      }),
    }).then((response) => response.json)
    navigate('')
  }, [])

  return <h2>Creating new post</h2>
}

export default NewPost
