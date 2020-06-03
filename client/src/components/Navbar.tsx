import {NavLink, useHistory} from 'react-router-dom';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const logoutHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
            <nav>
                <div className="nav-wrapper blue-grey px-1">
                    <NavLink to="/" className="brand-logo">LS</NavLink>

                    <ul className="right hide-on-med-and-down">
                        <li><NavLink to="/create">Create</NavLink></li>

                        <li><NavLink to="/links">Links</NavLink></li>

                        <li><a href="#" onClick={logoutHandler}>Logout</a></li>
                    </ul>
                </div>
            </nav>
    );
};
