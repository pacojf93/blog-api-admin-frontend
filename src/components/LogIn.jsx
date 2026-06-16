import { useState } from 'react'
import { useOutletContext } from 'react-router'

const logIn = (username, password, setUser) => {
  fetch('/api/users/log-in', {
    method: 'POST',
    body: new URLSearchParams({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((user) => {
      console.log(user)
      setUser(user)
    })
}

const LogIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser, navigate } = useOutletContext()

  return (
    <>
      <form
        className='mt-4'
        onSubmit={(e) => {
          e.preventDefault()
          logIn(username, password, setUser)
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
          Log In
        </button>
      </form>
    </>
  )
}

export default LogIn
