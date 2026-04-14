import { useLoaderData, Form } from "react-router"

const loader = async ({ params }) => {
    const post = await fetch(`/api/posts/${params.id}`)
        .then(response => response.json())
    return { post }
}

const action = async ({ request, params }) => {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)

    const updatedPost = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        body: new URLSearchParams(updates)
    })
        .then(response => response.json())

}

const Editor = () => {
    const { post } = useLoaderData()
    return <Form className="" key={post.id} method="post">
        <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" className="form-control" defaultValue={post.title} />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="abstract">Abstract</label>
            <input type="text" name="asbtract" id="abstract" className="form-control" defaultValue={post.abstract} />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="content">Content</label>
            <textarea type="text" name="content" id="content" className="form-control" rows="10" defaultValue={post.content} />
        </div>
        <div>
            <button type="submit" className="btn btn-outline-primary" >Save</button>
        </div>
    </Form>
}


export { Editor as default, loader, action }