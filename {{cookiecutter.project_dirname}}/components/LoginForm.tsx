import React, { useState } from 'react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`${process.env.API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password })
      })

      switch (response.status) {
        case 200:
          await response.json()
          setMessage('You logged in')
          break
        case 401:
          setMessage('Unauthorized')
          break
        default:
          throw new Error(`${response.status} - ${response.statusText}`)
      }
    } catch (error) {
      setMessage('Generic Error')
    }
  }

  return (
    <form data-test='form' onSubmit={handleOnSubmit}>
      <p data-test='message'>{message}</p>
      <input
        type='text'
        data-test='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type='password'
        data-test='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        type='submit'
        data-test='button'
      >
        submit
      </button>
    </form>
  )
}

export { LoginForm }
