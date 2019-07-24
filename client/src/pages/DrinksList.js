import React, { Component } from 'react';

import Drinks from '../components/Drinks';
import Container from '../components/Container';
import images from '../images.json';
import './App.css';

import DrinkIconPics from '../client/src/components/DrinkIconPics';


class DrinksList extends Component {

  state = {
    images

  };

  //\\//\\CLICK EVENT ON EACH DRINK IMAGE //\\//\\

  allDrinks = id => {

  };


  render() {
    return (
      <div className="App">
        <header className="header">
          Espresso Drinks
        </header>
        <Container>

        <DrinkIconPics
          pictures={this.state.images.map(picture => (
            <Drinks
              allDrinks={this.allDrinks}
              id={picture.id}
              key={picture.id}
              name={picture.name}
              image={picture.image}
            />
          ))}
        </Container>
        </div>
    );
  };

}


export default DrinksList;
