import React, { Component } from 'react';
import './App.css';
import Drinks from './components/Drinks';
import Container from './components/Container';
import images from './images.json';
// import { Link } from "./../../routes";

class App extends Component {

  state = {
    images
  };

  allDrinks = id => {
    let drinkSelection = images[id-1];
    let ingredients = drinkSelection.ingredients;
    let keys = []; // array for ingredient key values
    let ounces = []; // array for measurements of each ingredient
    let ingredientHeights = []; // array for the height in rem of each CSS component in the coffee cup

    for (let k in ingredients) keys.push(k);
    for(let q in ingredients) {
      if(ingredients.hasOwnProperty(q)) {
          let measurement = ingredients[q];
          ounces.push(measurement);
      }
    }
    console.log(keys)
    console.log(ounces)

    let totalOunces = ounces.reduce((a, b) => a + b, 0);

    for (let i = 0; i < ounces.length; i++) {
      // Note: total rem height for coffee cup is 20 rem, hence the calculation below (total height / ingredient ratio)
      ingredientHeights.push(20*(ounces[i]/totalOunces));
    }
    console.log(ingredientHeights)
  };

  render() {
    return (
      <div className="App">
        <header className="header">
          Espresso Drinks
        </header>
        <Container
          pictures={this.state.images.map(picture => (
          // <Link to={{
          //   pathname: `/recipe/${picture.picture_id}`,
          //   state: { recipe: picture.name }
          // }}>
            <Drinks
              allDrinks={this.allDrinks}
              id={picture.id}
              key={picture.id}
              name={picture.name}
              image={picture.image}
            />
            // </Link>
          ))}
        />
      </div>
    );
  };

}


export default App;
