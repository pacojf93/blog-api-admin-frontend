import { useState } from 'react'
import { useOutletContext } from 'react-router'

const newUser = (username, password, user) => {
  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  fetch('/api/users/sign-up', {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((user) => {
      console.log(user)
    })
}

const NewUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, navigate } = useOutletContext()

  return (
    <>
      <form
        className='mt-4'
        onSubmit={(e) => {
          e.preventDefault()
          newUser(username, password, user)
          navigate(-1)
        }}
      >
        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            Username
          </label>
          <input
            type='text'
            className='form-control'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-outline-primary'>
          Add
        </button>
      </form>
    </>
  )
}

export default NewUser
