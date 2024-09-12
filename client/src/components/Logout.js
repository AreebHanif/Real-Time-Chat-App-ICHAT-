import React from 'react'
import { Link } from 'react-router-dom'
import useLogout from './Hooks/useLogout'


export default function Logout() {
    const logout = useLogout()
    return (
        <li className="nav-item">
            <Link className="logout btn-danger nav-link" style={{color:'white',borderRadius:'18px'}} to="/logout" onClick={logout}><i className='fas fa-sign-out-alt'></i>
                Logout
            </Link>
        </li>
    )
}
