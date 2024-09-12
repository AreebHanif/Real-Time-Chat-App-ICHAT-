import React, { useState } from 'react';
import image from "../signup.png";
import { useSignup } from './Hooks/useSignup';
import Spinner from './Spinner';

export default function Signup() {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        gender: ""
    })

    let {loading,signup} = useSignup()

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setInputs({ ...inputs, [name]: value })

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(inputs)
    }

    return (
        <div className="container">
            <div className="signup-form">
                <div className="header">
                    <h1>SignUp Form</h1>
                </div>
                <div className="form-parts">
                    <div className="image-part">
                        <img src={image} alt="signup" />
                    </div>
                    <div className="form-part">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Enter Name</label>
                            <input type="text" required name='name' onChange={handleChange} value={inputs.name} id="name" placeholder="Enter Name" />

                            <label htmlFor="email">Enter Email</label>
                            <input type="text" required name='email' onChange={handleChange} value={inputs.email} id="email" placeholder="Enter Email" />

                            <label htmlFor="password">Enter Password</label>
                            <input type="password" required name='password' onChange={handleChange} value={inputs.password} id="password" placeholder="Enter Password" />

                            <label htmlFor="confirm-password">Enter Confirm Password</label>
                            <input type="password" required name='cpassword' onChange={handleChange} value={inputs.cpassword} id="confirm-password" placeholder="Enter Confirm Password" />

                            <label>Gender</label>
                            <div className="gender-selection">
                                <label htmlFor="male">Male</label>
                                <input type="radio" required id="male" name="gender" onChange={handleChange} value="male" />
                                <label htmlFor="female">Female</label>
                                <input type="radio" required id="female" name="gender" onChange={handleChange} value="female" />
                            </div>

                            <button type="submit">{loading ? <Spinner /> : "Sign Up"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
