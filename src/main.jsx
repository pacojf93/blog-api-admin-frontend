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

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<PostList />} />
        <Route path='posts/:id' element={<PostDetail />} />
        <Route path='log-in' element={<LogIn />} />
        <Route path='log-out' element={<LogOut />} />
        <Route path='tags/:id' element={<TaggedPosts />} />
        <Route path='posts' element={<PostList />} />
        <Route path='users' element={<h1>User list</h1>} />
        <Route path='tags' element={<h1>Tag list</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
