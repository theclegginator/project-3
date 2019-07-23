import React, { Component } from 'react';
import './App.css';
import Drinks from '../client/src/components/Drinks';
import Container from '../client/src/components/Container';
import images from './images.json';


class DrinksList extends Component {

  state = {
    images

  };

  allDrinks = id => {

  };


  render() {
    return (
      <div className="App">
        <header className="header">
          Espresso Drinks
        </header>
        <Container
          pictures={this.state.images.map(picture => (
            <Drinks
              allDrinks={this.allDrinks}
              id={picture.id}
              key={picture.id}
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
      </div>
    );
  };

}


export default DrinksList;
