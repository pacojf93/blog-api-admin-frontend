import { useState, useEffect } from 'react'
import './App.css'
import Post from './Components/Post'
import Editor from './Components/Editor'
import Navbar from './Components/Navbar'

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
    <div className='container-fluid d-flex flex-column vh-100'>
      <div className='row flex-grow-0'>
        <Navbar brand={'Blog'} />
      </div>
      <div className='row h-100'>
        <div className='col-3 d-flex flex-column h-100 border-end pt-3'>
          <div className='flex-grow-0 overflow-scroll h-75'>
            {posts && posts.map(post => <Post
              key={post.id}
              title={post.title}
              content={post.content}
              deleteMethod={() => deletePost(post.id)}
              id={post.id}
              selected={selectedPost}
              setSelected={() => setSelectedPost(posts.find(p => p.id === post.id))}
            />)}
          </div>
          <div className='p-3 border-top h-25'>
            <button className='btn btn-outline-primary w-100' onClick={newPost}>
              New
            </button>
          </div>
        </div>
        <div className='col-9 p-4 h-100'>
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
