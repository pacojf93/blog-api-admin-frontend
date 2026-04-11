import { useState, useEffect } from 'react'
import './App.css'
import Post from './Components/Post'
import Editor from './Components/Editor'
import Navbar from './Components/Navbar'

function App() {
  const [posts, setPosts] = useState(null)
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')
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
      setAbstract(selectedPost.abstract)
      setContent(selectedPost.content)
    }

  }, [selectedPost])

  const newPost = () => {
    fetch('/api/posts', {
      method: 'POST',
      body: new URLSearchParams({
        title: 'New post',
        abstract: 'Write an abstract here',
        content: 'Write some content in here',
        userId: 1
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
        abstract: abstract,
        content: content
      })
    })
      .then(response => response.json())
      .then(response => setPosts(posts.map(post => post.id === response.id ? response : post)))
  }

  return <>
    <div className='container-fluid vh-100 '>
      <div className='row'>
        <Navbar brand={'Blog admin dashboard'} />
      </div>
      <div className='row h-100'>
        <div className='col-3 h-100 border-end'>
          <div className='row mb-3'>
            <button className='btn btn-outline-primary w-100' onClick={newPost}>
              New
            </button>
          </div>
          <div className='row h-100'>
            <div className='col overflow-auto h-100'>
              {posts && posts.map(post => <Post
                key={post.id}
                title={post.title}
                content={post.abstract}
                deleteMethod={() => deletePost(post.id)}
                id={post.id}
                selected={selectedPost}
                setSelected={() => setSelectedPost(posts.find(p => p.id === post.id))}
              />)}
            </div>
          </div>
        </div>
        <div className='col-9 p-4 h-100'>
          {selectedPost && <Editor
            titleValue={title}
            titleHandleChange={(e) => setTitle(e.target.value)}
            contentValue={content}
            contentHandleChange={e => setContent(e.target.value)}
            abstractValue={abstract}
            abstractHandleChange={e => setAbstract(e.target.value)}
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
