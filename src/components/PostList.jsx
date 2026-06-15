import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router";

const Post = ({ title, abstract, id }) => (
  <div className="mt-2 card">
    <div className="card-body">
      <h3 className="mt-2 card-title">
        <Link to={`/posts/${id}`}>{title}</Link>
      </h3>
      <p className="mt-2 card-text">{abstract}</p>
    </div>
  </div>
);

const PostList = () => {
  const [posts, setPosts] = useState(null);
  const { user } = useOutletContext();
  
  const headers = user && user.token
    ? {Authorization: `Bearer ${user.token}`}
    : {}

  useEffect(() => {
    fetch("/api/posts", {
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, [user]);

  return (
    <>
      {posts ? (
        <ul className="mt-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              abstract={post.abstract}
              id={post.id}
            />
          ))}
        </ul>
      ) : (
        <h1>no posts available</h1>
      )}
    </>
  );
};

export default PostList;
