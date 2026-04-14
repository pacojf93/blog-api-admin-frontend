import { NavLink } from "react-router"

const Navbar = ({ brand }) => <nav className="navbar navbar-expand-lg bg-primary-subtle">
    <div className="container fluid">
        <span className="navbar-brand h1">{brand}</span>
        <div className="navbar-nav">
            <NavLink to='/home' className='nav-link'>Home</NavLink>
            <NavLink to='/about' className='nav-link'>About</NavLink>
        </div>
    </div>
</nav >

export default Navbar