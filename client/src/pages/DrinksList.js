import React, { Component } from 'react';
import './App.css';
import Drinks from '../client/src/components/Drinks';
import DrinkIconPics from '../client/src/components/DrinkIconPics';
import images from './images.json';
// import { Col, Row, Container } from '../client/src/components/Grid';

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
        />
      </div>
    );
  };

}


export default DrinksList;
