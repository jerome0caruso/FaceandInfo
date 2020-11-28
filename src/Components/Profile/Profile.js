import React, {useState, useEffect } from 'react';
import './Profile.css';

function Profile({user, entries}) {

    console.log(user.id, "here")

    fetch(`https://tranquil-savannah-71167.herokuapp.com/profile/${user.id}`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(user => {
    
    })

    return (
        <div className="profileContainer">
            <div className="proTable">
                <h1>Profile Information</h1>
                <div className="proInfo">
                    <h2>User Name:</h2><h3>{user.name}</h3>
                    <h2>User Email:</h2><h3> {user.email}</h3>
                    <h2>Images Submitted:</h2><h3> {entries}</h3>
                </div>
            </div>
        </div>
    )
}

export default Profile;