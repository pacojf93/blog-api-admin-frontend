import { redirect } from "react-router"

const action = async ({ params }) => {
    const deletedPost = await fetch(`/api/posts/${params.id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
    return redirect('/')
}

export { action }