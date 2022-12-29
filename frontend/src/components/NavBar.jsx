import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useLogout from '../hook/useLogout';

function NavBar() {
    const { user } = useContext(AuthContext);
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/"><h1>Workout Buddy</h1></Link>
                <nav>
                    {user && (
                        <div>
                            <span>{ user.email }</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default NavBar;