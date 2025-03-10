import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useAuthContext } from './Context/authcontext';

export default function Navbar() {
    const { authUser } = useAuthContext();
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">IChat-App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>

                        {!authUser && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}

                        {authUser && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/chat">Chat</Link>
                            </li>
                        )}

                        {authUser && <Logout />}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
