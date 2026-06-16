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
import UserDetail from './components/UserDetail.jsx'
import NewTag from './components/NewTag.jsx'
import Tags from './components/Tags.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<PostList />} />
        <Route path='log-in' element={<LogIn />} />
        <Route path='log-out' element={<LogOut />} />
        <Route path='posts' element={<PostList />} />
        <Route path='posts/:id' element={<PostDetail />} />
        <Route path='tags' element={<Tags />} >
          <Route index element={<TagList />}/> 
          <Route path='new' element={<NewTag />}/>          
          <Route path=':id' element={<TaggedPosts />} />
        </Route>        
        <Route path='tags/new' element={<NewTag />} />       
        <Route path='users' element={<UserList />} />
        <Route path='users/:id' element={<UserDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
