import React from 'react';
import '../../App.css';



const Navigation = ({ onRouteChange, isSignedIn }) => {

    if (isSignedIn.loggedIn) {
        return (
          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signOut')} className='f3 link dim black pointer login-btn'>Sign Out</p>
            {isSignedIn.profiled ? <p onClick={() => onRouteChange('home')} className='f3 link dim black pointer login-btn'>Home</p>: <p onClick={() => onRouteChange('profile')} className='f3 link dim black pointer login-btn'>Profile</p>}
          </nav>
        );
      } else {
        return (
          <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signIn')} className='f3 link dim black  pointer login-btn'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black pointer login-btn'>Register</p>
          </nav>
        );
      }
}

export default Navigation;