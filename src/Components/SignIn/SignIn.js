import React, {useState, useEffect } from 'react';
import './SignIn.css';

function SignIn({loadUser, onRouteChange, updateEntries}){


  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState();
  const [isValid, setIsValid] = useState(true);
 

  const onEmailChange = (event) => {
    setSignInEmail({signInEmail: event.target.value})
  }

  const onPasswordChange = (event) => {
    setSignInPassword({signInPassword: event.target.value})
  }

  const onSubmitSignIn = () => {
    
    //normally does a get, with second param, we can set an obj to spec.
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          console.log(user.id)
          loadUser(user);
          onRouteChange('home');
        } else {
          setIsValid(false);
          console.log("heee")
        }
      })
  }


    return (
      <article className="br1 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center sign-in-container">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <span style={{ display: isValid === false? "inherit" : "none" }}>Please fill in the fields</span>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Not Registered? Register Here!</p>
            </div>
          </div>
        </main>
      </article>
    );
}

export default SignIn;