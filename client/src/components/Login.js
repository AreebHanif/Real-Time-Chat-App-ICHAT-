import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import image from "../Login.png"
import { useLogin } from './Hooks/useLogin'
import Spinner from "./Spinner"

export default function Login() {

    const [inputs, setInputs] = useState({
        email:"",
        password:""
    })

    let {loading,login} = useLogin();

    const handleChange = (e)=>{
        let value = e.target.value;
        let name = e.target.name;
        setInputs({...inputs,[name]:value})
    }


    const handleSubmit = async (e)=>{
        e.preventDefault();
        login(inputs)
    }

    return (
        <div className="container">
            <div className="j-container">
                <div className="signup-form">
                    <div className="header">
                        <h1>Login Form</h1>
                    </div>
                    <div className="form-parts">
                        <div className="image-part">
                            <img src={image} alt="signup" />
                        </div>
                        <div className="form-part">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email">Enter Email</label>
                                <input type="text" id="email" name='email' required onChange={handleChange} value={inputs.email} placeholder="Enter Email" />
                                <label htmlFor="password">Enter Password</label>
                                <input type="password" id="password" name='password' required onChange={handleChange} value={inputs.password} placeholder="Enter Password" />
                                <p className='acc-info'>Don't have an account ? <Link className='link' to="/signup">Register</Link></p>
                                <button type="submit" >{loading ? <Spinner /> : "Login"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
