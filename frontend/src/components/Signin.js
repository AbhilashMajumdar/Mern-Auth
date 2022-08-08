import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Signin = () => {

    const history = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        company: "",
        role: "",
        skills: "",
        certifications: ""
    });

    const { name, email, password, address, company, role, skills, certifications } = userData;

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const sendRequest = async () => {
        const res = await axios.post('http://localhost:5000/auth/signin', {
            name,
            email,
            password,
            address,
            company,
            role,
            skills,
            certifications
        }).catch((err) => {
            console.log(err);
        });

        const data = await res.data;
        return data;
    }

    const handleForm = (e) => {
        e.preventDefault();
        sendRequest()
            .then(() => history('/login'))
    }

    const resetForm = () => {
        setUserData({
            name: "",
            email: "",
            password: "",
            address: "",
            company: "",
            role: "",
            skills: "",
            certifications: ""
        });
    }

    return (
        <div className='signin-container'>
            <div className="row justify-content-center my-3">
                <div className="col-md-3 col-10 bg-dark text-light px-4">
                    <div className="form-head text-center">
                        <h1 className='my-4'>SignIn</h1>
                    </div>
                    <form action="" onSubmit={handleForm}>
                        <div className="mb-2">
                            <input type="text"
                                className="form-control"
                                id="exampleInputName"
                                name='name'
                                placeholder='Name'
                                value={name}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="mb-2">
                            <input type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name='email'
                                placeholder='Email'
                                value={email}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="mb-2">
                            <input type="password"
                                className="form-control"
                                id="exampleInputPassword"
                                name='password'
                                placeholder='Password'
                                value={password}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="mb-2">
                            <textarea className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="1"
                                placeholder='Address'
                                name='address'
                                value={address}
                                onChange={handleInput}
                            ></textarea>
                        </div>

                        {/* <div className="mb-2">
                            <input type="number"
                                className='form-control'
                                name='phone'
                                placeholder='phone Number'
                                value={phone}
                                onChange={handleInput}
                            />
                        </div> */}

                        <div className="mb-2">
                            <input type="text"
                                className='form-control'
                                name='company'
                                placeholder='Company Name'
                                value={company}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="mb-2">
                            <input type="text"
                                className='form-control'
                                name='role'
                                placeholder='Job Role'
                                value={role}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="mb-2">
                            <textarea className="form-control"
                                id="exampleFormControlTextarea2"
                                rows="1"
                                placeholder='Skills'
                                name='skills'
                                value={skills}
                                onChange={handleInput}
                            ></textarea>
                        </div>

                        <div className="mb-2">
                            <textarea className="form-control"
                                id="exampleFormControlTextarea3"
                                rows="1"
                                name='certifications'
                                placeholder='Certifications'
                                value={certifications}
                                onChange={handleInput}
                            ></textarea>
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
    )
}

export default Signin