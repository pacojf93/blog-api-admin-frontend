import { useState } from 'react'

const CommentForm = ({ leaveAComment }) => {
  const [content, setContent] = useState('')
  return (
    <>
      <form
        className='mt-4'
        onSubmit={(e) => {
          e.preventDefault()
          leaveAComment(content)
        }}
      >
        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            Leave a comment
          </label>
          <input
            type='text'
            className='form-control'
            id='username'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-outline-primary'>
          Comment
        </button>
      </form>
    </>
  )
}

export default CommentForm
