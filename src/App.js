import React, {useState, useEffect } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Clarifai from 'clarifai';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import FaceBlank from './Components/FaceRecognition/FaceBlank';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import DemoLinks from './Components/DemoLinks/DemoLinks';
import 'tachyons';
import './App.css';
import defaultImage from './BlackBox.jpg'
import Profile from './Components/Profile/Profile'
import CryptoJS from 'crypto-js';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const [data, setData] = useState();
  const [box, setBox] = useState();
  const [people, setPeople] = useState();
  const [route, setRoute] = useState('signIn');
  const [clear, setClear] = useState(false);
  const [error, setError] = useState('');
  const [stopHittingBtn, setStopHittingBtn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(
    {
      loggedIn: false,
      profiled : false
    }
  );
  const[user, setUser] = useState(
    {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    });

const loadUser = (data) => {
  setUser(
    {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined 
    });
}
  let app;
//encypt api key and store server side 
  fetch(`https://tranquil-savannah-71167.herokuapp.com/apikey`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'},
  })
    .then(response => response.json())
    .then(ciphertext => {
      const bytes  = CryptoJS.AES.decrypt(ciphertext, 'key');
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      app = new Clarifai.App({
        apiKey: originalText
      });
  })


  const onRouteChange = (route) => {
    if( route === 'signOut') {
      //resetting state on logout
      setInput('');
      setImageUrl();
      setData();
      setBox();
      setPeople();
      setRoute('signIn');
      setClear(false);
      setError('');
      setIsSignedIn({
        loggedIn: false,
        profiled : false
      });
      setUser(
        {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        });

    } else if (route === 'home') {
      setIsSignedIn(Object.assign(isSignedIn, { loggedIn: true }))
      setIsSignedIn(Object.assign(isSignedIn, { profiled: false }))
      
    }
    else if(route === 'profile') {
      setIsSignedIn(Object.assign(isSignedIn, { profiled: true }))
    }
    setRoute(route);
  } 

  const onClear = () => {
    setClear(true);
    //url input clear
    setInput('')
    document.querySelector('.main-in').value ='';
  }

  //data from api for amount of people
  const calculatePeople = (data) => {
    setBox(data.data.regions);
    setPeople(data.data.regions.length); 
    
  }

  //setting url input to state//////////////////////////////////////////////////
  const onInputChange = (event) => {
   
    setInput(event.target.value);
    setTimeout(() => setStopHittingBtn(false), 500);
  } 

  const onSubmit = () => {
    //Disables submit button pressed too many times before api gets back
    setStopHittingBtn(true);
    
    console.log("click!!")
    //

    setError('');
    setClear(false);
    //if no valid image submitted use default
    input.length === 0 ? setImageUrl(defaultImage): setImageUrl(input);

    //1st api call to get face location
    let faceGet = app.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((faceDetectModel) => faceDetectModel.predict(input))   
    .then((response) => {
      console.log(response)
      if(response && input.length > 1){
        //allows the update and grabs the previous stored counts from DB
        setClear(true)
        fetch('https://tranquil-savannah-71167.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: user.id
          })
        })
          .then(response => response.json())
          .then(count => {
              //target object and the specific value to change, NOT the whole user state value
              setUser(Object.assign(user, { entries: count }))
              //allows the photos boxes to run
              setClear(false)
        })
        .catch(console.log)
      }
      return response;
    }).catch(err => {
      setError("I'm sorry we cannot find any faces on this image, please try a different image or link");
      console.log(err)
    });

     //2nd api call to get image data
    let dataGet = app.models
    .initModel({
      id: Clarifai.GENERAL_MODEL,
    })
    .then((GeneralModel) => GeneralModel.predict(input))
    .then((response) => {
      return response;
    }).catch(err =>{
      console.log(err)
      setError("I'm sorry we cannot find any faces on this image, please try a different image or link")
    })

    //waits for both api calls before setting state
    Promise.all([faceGet, dataGet]).then((response) => {
     //objects from the api/face location and info
      calculatePeople(response[0].outputs[0]);
      setData(response[1].outputs[0].data.concepts);
      setStopHittingBtn(true);
    })
    .catch(err =>{
      console.log(err)
      setError("I'm sorry we cannot find any faces on this image, please try a different image or link")
    })
  }

  return (
    <div className="App">
      <div className="header">
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      </div>
      
      {route === 'profile' ? <Profile user={user} entries={user.entries} /> :route === 'home' ? 
        <div>
          <Rank name={user?.name} entries={user?.entries}/>
          <ImageLinkForm onInChange={onInputChange} btnSmash={stopHittingBtn} clearField={onClear} onButtonSub={onSubmit}/>
          <div className="message">
            {error.length > 1 ? error :<span id="startingText">Please enter a URL for an Image</span> }
          </div>
          
          {data  === undefined ? <FaceBlank /> : <FaceRecognition data={data} error={error} clear={clear} imageUrl={imageUrl} numOfPeople={people} boxInfo={box}/>}
          <DemoLinks />
        </div>
        : ( route === 'signIn' 
            ? <div className="in"><SignIn loadUser={loadUser} onRouteChange={onRouteChange} /> </div>
            : <div className="in"><Register loadUser={loadUser} onRouteChange={onRouteChange} /></div> 
          )
      }
      
    </div>

  );
}

export default App;


