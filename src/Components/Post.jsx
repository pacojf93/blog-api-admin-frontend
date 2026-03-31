const Post = ({ title, content, deleteMethod, id, selected, setSelected }) =>
    <div className={`card ${selected === null ? ('') : (
        selected.id === id ? 'bg-primary' : ''
    )}`}
        onClick={setSelected}
    >
        <div className="card--body m-2">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
            <button className="btn btn-danger" onClick={() => deleteMethod(id)}>Delete</button>
        </div>
    </div>

export default Post