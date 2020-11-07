import React, {useState, useEffect } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import 'tachyons';
import './App.css';


function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const [data, setData] = useState();
  const [box, setBox] = useState();
  const [people, setPeople] = useState();
  const [route, setRoute] = useState('signIn');
  const [clear, setClear] = useState(false);
  const [error, setError] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);


  const app = new Clarifai.App({
    apiKey: '765497e68c3b4da09130631e198afbef'
  });

  const onRouteChange = (route) => {
    if( route === 'signOut') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  } 

  const onClear = () => {
    setClear(true)
    // setError('');
    document.querySelector('.main-in').value ='';
  }

  const calculatePeople = (data) => {
   
    setBox(data.data.regions);
    setPeople(data.data.regions.length); 
    
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  } 
  const onSubmit = () => {
    setError('');
    setClear(false)
    setImageUrl(input)
    let faceGet = app.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((faceDetectModel) => faceDetectModel.predict(input))
    .then((response) => {
      return response;
    }).catch(err => console.log(err))
    let dataGet = app.models
    .initModel({
      id: Clarifai.GENERAL_MODEL,
    })
    .then((GeneralModel) => GeneralModel.predict(input))
    .then((response) => {
      return response;
    }).catch(err => console.log(err))

    Promise.all([faceGet, dataGet]).then((response) => {
      calculatePeople(response[0].outputs[0]);
      setData(response[1].outputs[0].data.concepts);
    })
    .catch(err =>{
      console.log(err)
      setError("I'm sorry we cannot find any faces on this image, please try a different image or link")
    })
  }

  return (
    <div className="App">
      <div className="header">
        <Logo />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      </div>
      {route === 'home' 
        ? 
        <div>
          <Rank />
          <div className="message">
            {error.length > 1 ? error :'Please enter a URL for an Image' }
          </div>
          <ImageLinkForm onInChange={onInputChange} clearField={onClear} onButtonSub={onSubmit}/>
          {data  === undefined ? null : <FaceRecognition data={data} error={error} clear={clear} imageUrl={imageUrl} numOfPeople={people} boxInfo={box}/>}
        </div>
        : (
            route === 'signIn' 
            ? <SignIn onRouteChange={onRouteChange} /> 
            : <Register onRouteChange={onRouteChange} /> 
          )
      }
    </div>
  );
}

export default App;
