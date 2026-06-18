import { useContext, useEffect } from 'react'
import { BlogContext } from '../App'

const LogOut = () => {
  const { setUser, navigate } = useContext(BlogContext)

  useEffect(() => {
    setUser(null)
    navigate(-1)
  }, [])

  return <h2>Loggin out</h2>
}

export default LogOut
