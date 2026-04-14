import { Form, NavLink } from "react-router"

const Post = ({ title, abstract, id }) =>
    <div className={'card mb-3 row'}>
        <div className="card--body m-2">
            <NavLink to={`/${id}/`}>
                <h5 className="card-title">{title}</h5>
            </NavLink>
            <p className="card-text">{abstract}</p>
            <Form action={`/${id}/delete`} method="post">
                <button className="btn btn-outline-danger btn-sm">Delete</button>
            </Form>
        </div>
    </div >

export default Post