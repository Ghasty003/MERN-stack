import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <header>
            <div className="container">
                <Link to="/"><h1>Workout Buddy</h1></Link>
            </div>
            <nav>
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;