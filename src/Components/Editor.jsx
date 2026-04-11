const Editor = ({ titleValue, titleHandleChange, contentValue, contentHandleChange, abstractValue, abstractHandleChange, handleUpdate }) =>
    <form onSubmit={handleUpdate} className="">
        <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" className="form-control" value={titleValue} onChange={titleHandleChange} />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="abstract">Abstract</label>
            <input type="text" name="asbtract" id="abstract" className="form-control" value={abstractValue} onChange={abstractHandleChange} />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="content">Content</label>
            <textarea type="text" name="content" id="content" className="form-control" rows="10" value={contentValue} onChange={contentHandleChange} />
        </div>
        <div>
            <button type="submit" className="btn btn-outline-primary" >Save</button>
        </div>
    </form>

export default Editor