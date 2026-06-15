import { useState, useEffect } from 'react'
import './App.css'
import Post from './Components/Post'
import Editor from './Components/Editor'
import Navbar from './Components/Navbar'
import LogIn from './Components/LogIn'
import Posts from './Components/Posts'
import Users from './Components/Users'

function App() {
  /* const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [content, setContent] = useState("");
  const [selectedPost, setSelectedPost] = useState(null); */
  const [user, setUser] = useState(null)
  const [nav, setNav] = useState('posts')

  /*   useEffect(() => {
    if (selectedPost !== null) {
      setTitle(selectedPost.title);
      setAbstract(selectedPost.abstract);
      setContent(selectedPost.content);
    }
  }, [selectedPost]); */

  return (
    <>
      <div className='container-fluid vh-100 '>
        <div className='row'>
          <Navbar
            brand={'Blog admin dashboard'}
            user={user}
            setUser={setUser}
            setNav={setNav}
          />
        </div>

        {user ? (
          nav === 'posts' ? (
            <Posts />
          ) : nav === 'users' ? (
            <Users />
          ) : (
            <h1>Ups! something went wrong!</h1>
          )
        ) : (
          <div className='row h-100 d-flex flex-column justify-content-center align-content-center'>
            <LogIn setUser={setUser} />
          </div>
        )}
      </div>
    </>
  )
}

export default App
