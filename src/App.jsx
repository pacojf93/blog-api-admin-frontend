import { useState, useEffect } from 'react'
import './App.css'
import Post from './Components/Post'
import Editor from './Components/Editor'

function App() {
  const [posts, setPosts] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(response => setPosts(response))
  }, [])

  useEffect(() => {
    if (selectedPost !== null) {
      setTitle(selectedPost.title)
      setContent(selectedPost.content)
    }

  }, [selectedPost])

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

  const updatePost = (id) => {
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: new URLSearchParams({
        title: title,
        content: content
      })
    })
      .then(response => response.json())
      .then(response => setPosts(posts.map(post => post.id === response.id ? response : post)))
  }

  return <>
    <div className='container-fluid' >
      <div className='row vh-100'>
        <div className='col-3 d-flex flex-column border-end vh-100'>
          <div className='flex-grow-1 overflow-auto p-3 '>
            {posts && posts.map(post => <Post
              key={post.id}
              title={post.title}
              content={post.content}
              deleteMethod={deletePost}
              id={post.id}
              selected={selectedPost}
              setSelected={() => setSelectedPost(posts.find(p => p.id === post.id))} />)}
          </div>
          <div className='p-3 border-top bg-white'>
            <button className='btn btn-primary w-100' onClick={newPost}>
              New
            </button>
          </div>
        </div>
        <div className='col-9 p-4 overflow-auto vh-100'>
          {selectedPost && <Editor
            titleValue={title}
            titleHandleChange={(e) => setTitle(e.target.value)}
            contentValue={content}
            contentHandleChange={e => setContent(e.target.value)}
            id={selectedPost.id}
            handleUpdate={(e) => {
              e.preventDefault()
              updatePost(selectedPost.id)
            }}
          />}
        </div>
      </div>
    </div>
  </>
}

export default App
