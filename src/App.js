import React, { Component } from 'react';

import './App.css';
import Drinks from './components/drinks';
import Container from './components/container';
import images from './images.json';


class App extends Component {

  state = {
    images

  };

  allDrinks = id => {

  };


render () {
  return (
<div className="App">
     <header className = "header">
      Espresso Drinks
     </header>
      <Container
      pictures=
        {this.state.images.map(picture => (
      <Drinks 
      allDrinks={this.allDrinks}
      id={picture.id}
      image={picture.image}
      />
        ))}
        />
    </div>
  );
};

}


export default App;
