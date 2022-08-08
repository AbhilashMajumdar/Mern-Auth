import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store';

const Login = () => {

    const dispatch = useDispatch();

    const history = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = userData;

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const sendRequest = async () => {
        const res = await axios.post('http://localhost:5000/auth/login', {
            email,
            password
        }).catch((err) => {
            console.log(err);
        });

        const data = await res.data;
        return data;
    }

    const handleForm = (e) => {
        e.preventDefault();
        sendRequest()
            .then(() => history('/welcome'))
            .then(() => dispatch(authActions.login()));
    }

    const resetForm = () => {
        setUserData({
            email: "",
            password: ""
        });
    }

    return (
        <>
            <div className="login-conteiner py-5">
                <div className="row justify-content-center my-5">
                    <div className="col-md-4 bg-dark text-light px-5 py-5">
                        <div className="login-head text-center">
                            <h1 className='mb-4'>LogIn</h1>
                        </div>

                        <form action="" onSubmit={handleForm}>
                            <div className="mb-3">
                                <input type="email"
                                    className='form-control'
                                    name='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={handleInput}
                                />
                            </div>

                            <div className="mb-3">
                                <input type="password"
                                    className='form-control'
                                    name='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={handleInput}
                                />
                            </div>

                            <div className="pb-4 mt-4 text-center">
                                <button type="reset"
                                    className="btn btn-light mx-4"
                                    onClick={resetForm}
                                >Reset</button>
                                <button type="submit" className="btn btn-light">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login