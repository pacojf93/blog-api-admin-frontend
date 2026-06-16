import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './scss/styles.scss'
import * as boostrap from 'bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import PostList from './components/PostList.jsx'
import PostDetail from './components/PostDetail.jsx'
import LogIn from './components/LogIn.jsx'
import LogOut from './components/LogOut.jsx'
import TaggedPosts from './components/TaggedPosts.jsx'
import UserList from './components/UserList.jsx'
import TagList from './components/TagList.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<PostList />} />
        <Route path='log-in' element={<LogIn />} />
        <Route path='log-out' element={<LogOut />} />
        <Route path='posts' element={<PostList />} />
        <Route path='posts/:id' element={<PostDetail />} />
        <Route path='tags' element={<TagList />} />
        <Route path='tags/:id' element={<TaggedPosts />} />        
        <Route path='users' element={<UserList />} />
        <Route path='users/:id' element={<h1>User detail</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
