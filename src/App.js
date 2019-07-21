import React, { Component } from 'react';
import './App.css';
import DrinkList from './components/DrinkList';
import Wrapper from './components/Wrapper';
import images from './images.json';


class App extends Component {

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
        <Wrapper
          pictures={this.state.images.map(picture => (
            <DrinkList
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
