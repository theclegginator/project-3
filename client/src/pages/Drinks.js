import React, { Component } from 'react';

import './App.css';
import Drinks from '../client/src/components/drinks';
import Container from '../client/src/components/container';
import images from './images.json';


class Drinks extends Component {

  state = {
    images

  };

  allDrinks = id => {

  };


render () {
  return (
<div className="Drinks">
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
export default Drinks;
