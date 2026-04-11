const Post = ({ title, content, deleteMethod, id, selected, setSelected }) =>
    <div className={`card mb-3 row ${selected === null ? ('') : (
        selected.id === id ? 'bg-primary-subtle border-primary-subtle' : ''
    )}`}
        onClick={setSelected}
    >
        <div className="card--body m-2">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
            <button className="btn btn-outline-danger btn-sm" onClick={deleteMethod}>Delete</button>
        </div>
    </div>

export default Post