import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <NavLink className="links" to='/about'>About</NavLink>
                <NavLink className="links" to='/posts'>Posts</NavLink>
            </div>
        </div>
    )
}

export default NavBar