import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './scss/styles.scss'
import * as boostrap from 'bootstrap'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import App from './App.jsx'
import PostList from './components/posts/PostList.jsx'
import LogIn from './components/LogIn.jsx'
import LogOut from './components/LogOut.jsx'
import TagsRoute from './components/tags/TagsRoute.jsx'
import PostsRoute from './components/posts/PostsRoute.jsx'
import UsersRoute from './components/users/UsersRoute.jsx'
import CommentsRoute from './components/comments/CommentsRoute.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<Navigate to='posts' />} />
        <Route path='log-in' element={<LogIn />} />
        <Route path='log-out' element={<LogOut />} />
        {PostsRoute}
        {TagsRoute}
        {UsersRoute}
        {CommentsRoute}
      </Route>
    </Routes>
  </BrowserRouter>,
)
