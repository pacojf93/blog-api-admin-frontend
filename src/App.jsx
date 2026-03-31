import { useState, useEffect } from 'react'
import './App.css'
import Post from './Components/Post'
import Form from './Components/Form'

function App() {
  const [posts, setPosts] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [edited, setEdited] = useState(null)

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(response => setPosts(response))
  }, [])

  const newPost = () => {
    fetch('/api/posts', {
      method: 'POST',
      body: new URLSearchParams({
        title: 'New post',
        content: 'Write some content in here'
      })
    })
      .then(response => response.json())
      .then(response => setPosts([...posts, response]))
  }

  const deletePost = (id) => {
    fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(response => setPosts(posts.filter(post => post.id !== response.id)))
  }

  return <>
    <div className='container'>
      <div className='row h-100'>
        <div className='col overflow-auto'>
          {posts && posts.map(post => <Post key={post.id} title={post.title} content={post.content} deleteMethod={deletePost} id={post.id} />)}
          <button onClick={newPost} className='btn'>New</button>
        </div>
        <div className='col-6'></div>
      </div>
    </div>
  </>
}

export default App
