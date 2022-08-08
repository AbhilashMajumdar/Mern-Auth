import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Navbar = () => {

    const history = useNavigate();

    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.isLoggedIn);

    const sendRequest = async () => {
        const res = await axios.get('http://localhost:5000/auth/logout', null, {
            withCredentials: true
        }).catch((err) => console.log(err));

        if (res.status === 200) {
            return res;
        }

        return new Error("able to logout, Please try again.");
    }

    const handleLogout = () => {
        sendRequest()
            .then(() => dispatch(authActions.logout()))
            .then(() => history('/'));
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark uni-padding">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">

                            {
                                !isLoggedIn &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/signin">Signin</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                    </li>
                                </>
                            }

                            {
                                isLoggedIn &&
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/logout" onClick={handleLogout}>Logout</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar