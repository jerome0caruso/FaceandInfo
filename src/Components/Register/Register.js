import React, {useState, useEffect } from 'react';
import '../SignIn/SignIn.css';

function Register({loadUser, onRouteChange}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [isValid, setIsValid] = useState(true);
  const [vEmail, setvEmail] = useState();

  const onNameChange = (event) => {
    setName(event.target.value);
  }
  const onEmailChange = (event) => {
    let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    let validEmail = regex.test(String(event.target.value).toLowerCase());
    
    if(validEmail) {
      setvEmail(true);
      setEmail(event.target.value);
    } else {
      setvEmail(false);
    }
    
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const onSubmitSignIn = () => {
    
    // onRouteChange('home');
    //normally does a get, with second param, we can set an obj to spec.
    fetch('https://tranquil-savannah-71167.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user !== 'unable to register') {
          loadUser(user);
          onRouteChange('home');
        } else {
          onRouteChange('register');
          setIsValid(false);
        }
      })
  }

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center sign-in-container">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <span style={{ display: isValid === false? "inherit" : "none" }}>Please fill in the fields</span>
              <span style={{ display: vEmail=== false? "inherit" : "none" }}>Please enter a correct email</span>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onBlur={onEmailChange}
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
                className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                type="submit"
                value="Register"
                onClick={onSubmitSignIn}
              />
            </div>
          </div>
        </main>
      </article>
    );
}

export default Register;