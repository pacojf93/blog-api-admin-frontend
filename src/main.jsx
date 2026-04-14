import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import Root, { loader as rootLoader, action as rootAction } from './routes/root.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Editor, { loader as editorLoader, action as editorAction } from './routes/editor.jsx'
import { action as deleteAction } from './routes/delete.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

const router = createBrowserRouter([
  {
    path: '/', loader: rootLoader, action: rootAction, Component: Root, children: [
      { path: 'home', Component: Home },
      { path: 'about', Component: About },
      { path: ':id', loader: editorLoader, action: editorAction, Component: Editor },
      { path: ':id/delete', action: deleteAction }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
