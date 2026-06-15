const Navbar = ({ brand, user, setUser, setNav }) => (
  <nav className='navbar navbar-expand-lg bg-primary-subtle'>
    <div className='container fluid'>
      <div className='d-flex  align-items-center gap-3'>
        <span className='navbar-brand h1'>{brand}</span>
        {user && (
          <>
            <button className='nav-link' onClick={() => setNav('posts')}>
              Posts
            </button>
            <button className='nav-link' onClick={() => setNav('users')}>
              Users
            </button>
          </>
        )}
      </div>
      {user && (
        <div className='d-flex align-items-center gap-3'>
          <span className='navbar-text'>{user.username}</span>
          <button
            className='btn btn-outline-primary'
            onClick={() => setUser(null)}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  </nav>
)

export default Navbar
