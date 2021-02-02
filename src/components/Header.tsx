import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="pages">
                <ul className="pages-list">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/second-page">Second page</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default withRouter(Header);
