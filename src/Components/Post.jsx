const Post = ({ title, content, deleteMethod, id }) => <div className="card">
    <div className="card--body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <button className="btn" onClick={() => deleteMethod(id)}>Delete</button>
    </div>
</div>

export default Post