import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Drinks from '../components/Drinks';
import { Container } from "../components/Grid";
import images from '../images.json';
import '../App.css';
// import pics from '../images/coffee-icons'

import DrinkIconPics from '../components/DrinkIconPics';

class DrinksList extends Component {

  state = {
    images,
  };

  //\\//\\CLICK EVENT ON EACH DRINK IMAGE //\\//\\

  allDrinks = id => {

  };
  // selectedCoffeeRecipe = id => {
  //   console.log("this is working")
  //   console.log(id)
  // }

  render() {
    console.log(images)
    return (
      <div className="App background-gradient">
        <div className="background-gradient">
        
        <header className="header">
          Espresso Drinks
        </header>
        <Container>

        <DrinkIconPics
          pictures={this.state.images.map(picture => (
            <Link to={{
                pathname: "/recipe",
                data: picture.id // your data array of objects
               }}>
              <Drinks
                // selectedCoffeeRecipe={this.selectedCoffeeRecipe}
                // allDrinks={this.allDrinks}
                id={picture.id}
                key={picture.id}
                name={picture.name}
                image={picture.image}
                // /Users/theclegginator/bootcamp/Homework/project-3/client/src/pages/DrinksList.js
                
              />
            </Link>
          ))}
          />
        </Container>
        </div>
        </div>
    );
  };

}


export default DrinksList;
