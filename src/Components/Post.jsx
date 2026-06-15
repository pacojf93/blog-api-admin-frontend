const Post = ({ post, setNav }) => (
  <div className={'card mb-3 row'} onClick={() => setNav('editor')}>
    <div className='card--body m-2'>
      <h5 className='card-title'>{post.title}</h5>
      <p className='card-text'>{post.abstract}</p>
      {/*       <button className="btn btn-outline-danger btn-sm" onClick={() => {}}>
        Delete
      </button> */}
    </div>
  </div>
)

export default Post
