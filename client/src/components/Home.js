import React from 'react'
import HomePic from "../Home.png"
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='main-home'>
      <div className="home-page">
        <div className="home-parts">
          <div className="text">
            <h1>
              <span className="welcome">Welcome to </span>
              <span className="ichat">IChat</span>
            </h1>
            <p>
              Let's dive into the world of the internet. Create an account and start chatting with all the members you like.
              Whether you're looking to catch up with friends or connect with new people, our platform has you covered.
              It’s fast, secure, and easy to use. Click the button below to Sign Up and get started on your journey to seamless communication!
            </p>
          </div>
          <div className="pic">
            <img src={HomePic} alt="Home" />
          </div>
        </div>
        <div className="signup-btn">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
