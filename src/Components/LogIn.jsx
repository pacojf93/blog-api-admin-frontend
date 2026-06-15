import { useState } from 'react'

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

const LogIn = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form
      className='w-100'
      style={{ maxWidth: '400px' }}
      onSubmit={(e) => {
        e.preventDefault()
        logIn(username, password, setUser)
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
  )
}

export default LogIn
