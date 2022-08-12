import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';





const initialState  =  {
  input: '',
  imageUrl: '',
  box: {},
  route: 'Signin',
  isSignedin: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.name,
        entries: data.entries,
        joined: data.joined
    }})
  }
  
  calculatFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://stormy-ocean-88968.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
          .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://stormy-ocean-88968.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => this.setState(Object.assign(this.state.user, {entries:count}))
          )}

        this.displayFaceBox(this.calculatFaceLocation(response))
      })
      .catch(err => console.log("something" , err));
  }

  onRouteChange = (route) => {
    if (route === 'Signout'){
      this.setState(initialState)
    } else if (route === 'Home'){
      this.setState({isSignedin: true})
    }
    this.setState({ route: route });
  }

  render() {
   const {isSignedin, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn ={isSignedin} onRouteChange={this.onRouteChange} />
        {
          route === 'Home' ?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </div>
            : (
             route === 'Signin' ?

                <Signin loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />


            )

        }
      </div>

    );
  }

}

export default App;
