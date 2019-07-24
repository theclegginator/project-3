import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import DrinksList from './pages/DrinksList';
import Shops from './pages/Shops';
import Recipe from './pages/Recipe';
import Nav from "./components/Nav"
import Container from './components/Container';
import Drinks from './components/Drinks';
import DrinkIconPics from './components/DrinkIconPics';
import images from './images.json';
// import { Link } from "./../../routes";

class App extends Component {

  state = {
    images
  };

  allDrinks = id => {
    let drinkSelection = images[id - 1];
    let ingredients = drinkSelection.ingredients;
    let keys = []; // array for ingredient key values
    let ounces = []; // array for measurements of each ingredient
    let ingredientHeights = []; // array for the height in rem of each CSS component in the coffee cup

    for (let k in ingredients) keys.push(k);
    for (let q in ingredients) {
      if (ingredients.hasOwnProperty(q)) {
        let measurement = ingredients[q];
        ounces.push(measurement);
      }
    }
    console.log(keys)
    console.log(ounces)

    let totalOunces = ounces.reduce((a, b) => a + b, 0);

    for (let i = 0; i < ounces.length; i++) {
      // Note: total rem height for coffee cup is 20 rem, hence the calculation below (total height / ingredient ratio)
      ingredientHeights.push(20 * (ounces[i] / totalOunces));
    }
    console.log(ingredientHeights)
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={DrinksList} />
              <Route exact path="/shops" component={Shops} />
              <Route exact path="/recipe" component={Recipe} />
            </Switch>
          </div>
        </Router>
        <div>
          <Container>
            <h1> Mack Daddy Landing Page</h1>

          </Container>
        </div>
        </div>
        );
      };
    }
    
    
    export default App;
