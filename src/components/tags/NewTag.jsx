import { useState, useContext } from 'react'
import { BlogContext } from '../../App'

const newTag = (name, user) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch('/api/tags', {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams({
      name: name,
    }),
  }).then((response) => response.json())
}

const NewTag = () => {
  const [name, setName] = useState('')
  const { user, navigate } = useContext(BlogContext)

  return (
    <>
      <form
        className='mt-4'
        onSubmit={(e) => {
          e.preventDefault()
          newTag(name, user)
          navigate(-1)
        }}
      >
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Tag name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-outline-primary'>
          Add
        </button>
      </form>
    </>
  )
}

export default NewTag
