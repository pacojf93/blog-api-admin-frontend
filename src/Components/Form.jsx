const Form = ({ titleValue, titleHandleChange, contentValue, contentHandleChange }) => <form action="">
    <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" className="form-control" value={titleValue} onChange={titleHandleChange} />
    </div>
    <div className="form-group">
        <label htmlFor="content">Content</label>
        <input type="text" name="content" id="content" className="form-control" value={contentValue} onChange={contentHandleChange} />
    </div>
    <button type="submit" className="btn">Save</button>
</form>

export default Form