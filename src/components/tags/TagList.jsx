import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router'
import { BlogContext } from '../../App'

const Tag = ({ name, id }) => (
  <div className='mt-2 card'>
    <div className='card-body'>
      <h3 className='mt-2 card-title'>
        <Link to={`/tags/${id}`}>{`#${name}`}</Link>
      </h3>
    </div>
  </div>
)

const TagList = () => {
  const [tags, setTags] = useState(null)
  const { user } = useContext(BlogContext)

  const headers =
    user && user.token ? { Authorization: `Bearer ${user.token}` } : {}

  useEffect(() => {
    fetch('/api/tags', {
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => setTags(res))
  }, [user])

  return (
    <>
      {tags ? (
        <ul className='mt-4'>
          {tags.map((tag) => (
            <Tag key={tag.id} name={tag.name} id={tag.id} />
          ))}
        </ul>
      ) : (
        <h1>no tags available</h1>
      )}
    </>
  )
}

export default TagList
