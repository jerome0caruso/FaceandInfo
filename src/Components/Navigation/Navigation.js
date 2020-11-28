import React from 'react';
import '../../App.css';



const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn.loggedIn) {
        return (
          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signOut')} className='f3 link dim black pointer login-btn'>Sign Out</p>
            {isSignedIn.profiled ? <p onClick={() => onRouteChange('home')} className='f3 link dim black pointer login-btn'>Home</p>: <p onClick={() => onRouteChange('profile')} className='f3 link dim black pointer login-btn'>Profile</p>}
            <a href="#demo-links" className='f3 link dim black pointer login-btn'>Sample URL's</a>
          </nav>
        );
      } else {
        return (
          <nav className="nav">
            <div className="navCenter">
              <h1>Welcome to Capture</h1>
              </div>
              <div className="navRight">
                <p onClick={() => onRouteChange('signIn')} className='f3 link dim black  pointer login-btn'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black pointer login-btn'>Register</p>
                
              </div>
          
            
          </nav>
        );
      }
}

export default Navigation;