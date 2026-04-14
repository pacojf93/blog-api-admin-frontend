import { useLoaderData, Outlet, redirect, Form } from "react-router"
import Navbar from "../components/Navbar"
import Post from "../components/Post"

const loader = async () => {
    const posts = await fetch('/api/posts')
        .then(response => response.json())
    return { posts }
}

const action = async () => {
    const newPost = await fetch('/api/posts', {
        method: 'POST',
        body: new URLSearchParams({
            title: 'New post',
            abstract: 'Write an abstract here',
            content: 'Write some content in here',
            userId: 1
        })
    })
        .then(response => response.json())
    return redirect(`/${newPost.id}`)
}

const Root = () => {
    const { posts } = useLoaderData()

    return <>
        <div className='container-fluid vh-100 '>
            <div className='row'>
                <Navbar brand={'Blog admin dashboard'} />
            </div>
            <div className='row h-100'>
                <div className='col-3 h-100 border-end'>
                    <div className='row mb-3'>
                        <Form method="post">
                            <button type="submit" className='btn btn-outline-primary w-100'>
                                New
                            </button>
                        </Form>
                    </div>
                    <div className='row h-100'>
                        <div className='col overflow-auto h-100'>
                            {posts && posts.map(post => <Post
                                key={post.id}
                                title={post.title}
                                abstract={post.abstract}
                                id={post.id}
                            />)}
                        </div>
                    </div>
                </div>
                <div className='col-9 p-4 h-100'>
                    <Outlet />
                </div>
            </div>
        </div>
    </>
}

export { Root as default, loader, action }