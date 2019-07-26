import React, { Component } from "react";

import { Col, Row, Container } from "../components/Grid";
import images from '../images.json';
import Mug from '../components/Mug'
import Drinks from '../components/Drinks'
import IngredientMilk from "../components/IngredientMilk"
import IngredientWater from "../components/IngredientWater"
import IngredientCoffee from "../components/IngredientCoffee"
import IngredientIceCream from "../components/IngredientIceCream"
import IngredientHotChoc from "../components/IngredientHotchoc"
import IngredientEspresso from "../components/IngredientEspresso";
import IngredientFoamedMilk from "../components/IngredientFoamedMilk"
import IngredientSteamedMilk from "../components/IngredientSteamedMilk"
import IngredientWhippedCream from "../components/IngredientWhippedCream"
import IngredientCondensedMilk from "../components/IngredientCondensedMilk"


class Recipe extends Component {
  state = {
    images,
    recipe : {},
    ingredientList : [],
    ounces : [],
    firstIngredient: [],
    divHeights : [],
    headFirst : [],
    animationDelays: []
  };

  selectedCoffeeRecipe = id => {
    console.log("id = " + id)
    let drinkSelection = images[id-1];
    let ingredients = drinkSelection.ingredients;
    const keys = []; // array for ingredient key values
    const ounces = []; // array for measurements of each ingredient
    const ingredientHeights = []; // array for the height in rem of each CSS component in the coffee cup
    const firstIngredient = [];
    const headTitles = [];
    const animationDelays = [];

    for (let k in ingredients) keys.push(k);
    let ingredientKeys = [];
    for (let i = 0; i < keys.length; i++) {
      ingredientKeys.unshift(keys[i]);
      animationDelays.unshift(i*0.6);
    }
    this.setState(
      {ingredientList : ingredientKeys,
      animationDelays : animationDelays}
    )
    
    // This switch case sorts through the possible ingredients and assigns a component name to it
      for (let i = 0; i < keys.length; i++) { 
        if (i === 0) {
          firstIngredient.push(true)
        }
        else {
          firstIngredient.push(false)
        }
      }
      for (let i = 0; i < keys.length; i++) {
      switch(keys[i]) {
        case "Decaf Drip Brew":
        case "Drip Brew":
        case "French Press":
          headTitles.unshift(IngredientCoffee)
          break;
        case "Foamed Milk":
          headTitles.unshift(IngredientFoamedMilk)
          break;
        case "Steamed Milk":
          headTitles.unshift(IngredientSteamedMilk)
          break;
        case "Warm Milk":
          headTitles.unshift(IngredientMilk)
          break;
        case "Condensed Milk":
          headTitles.unshift(IngredientCondensedMilk)
          break;
        case "Espresso":
        case "Long Pull Espresso":
        case "Cubano":
          headTitles.unshift(IngredientEspresso)
          break;
        case "Hot Chocolate":
          headTitles.unshift(IngredientHotChoc)
          break;
        case "Whipped Cream":
          headTitles.unshift(IngredientWhippedCream)
          break;
        case "Hot Water":
          headTitles.unshift(IngredientWater)
          break;
        case "Ice Cream":
          headTitles.unshift(IngredientIceCream)
          break;

        default:
          console.log("Error! No ingredients found in recipe.")
      }
    }
    // sets the components in the order in which they should be made
    this.setState({headFirst : headTitles})

    for(let q in ingredients) {
      if(ingredients.hasOwnProperty(q)) {
          let measurement = ingredients[q];
          ounces.unshift(measurement);
        }
        this.setState({ounces: ounces})
    }
    // console.log(keys)
    // console.log(ounces)

    let totalOunces = ounces.reduce((a, b) => a + b, 0);

    for (let i = 0; i < ounces.length; i++) {
      // Note: total rem height for coffee cup is 20 rem, hence the calculation below (total height / ingredient ratio)
      ingredientHeights.push(20*(ounces[i]/totalOunces));
    }
    // console.log(ingredientHeights)
    this.setState({divHeights : ingredientHeights})
  }

  componentDidMount() {
    let { data } = this.props.location;
    if (data === undefined) {
      // default to espresso if no link was followed in react router to get here
      data = 1;
    }
    // data is the id of the coffee recipe
    this.setState({recipe: images[data-1]}) // set the recipe state equal to the id
    this.selectedCoffeeRecipe(data)
  }

  render() {
    // let headFirst = [ IngredientEspresso, IngredientMilk ]

    return (
      <div>     
      <Container fluid>
        <div className="selectedRecipe">
        <Row>
        <h1 className="selectedRecipeTitle">{this.state.recipe.name}</h1>
          <Col size="md-8 xs-12 md-offset-1">
              
              {/* COFFEE MUG */}
              <div className="container mug-wrapper">
                <div className="columns">
                    <div className="column"></div>
                    <div className="column">
                        {/* Area for steam directly above the mug */}
                        <div id="steam-engine">
                            <div className="steam-right"></div>
                            <div className="steam-center"></div>
                            <div className="steam-left"></div>
                        </div>
                        <div id="drink">
                            {/* Are for the mug, will contain each ingredient */}
                            <div id="mug">
                                <div className="mug-handle"></div>
                                <div className="air">air</div>
                                {/* MAP THE COMPONENT ARRAY FOR EACH INGREDIENT */}
                                <div>{this.state.headFirst.map((Component, i) => (
                                      <Component 
                                        key={i}
                                        height={this.state.divHeights[i] + 'rem'}
                                        firstIngredient={this.state.firstIngredient[i]}
                                        name={this.state.ingredientList[i]}
                                        ounces={this.state.ounces[i]}
                                        animationDelays={this.state.animationDelays[i]}
                                      />
                                  ))
                                }</div>
                                {/* <div className="milk"><span className="ingredient-text-animation">Milk (30oz)</span></div>
                                <div className="coffee"><span className="ingredient-text-animation">Coffee (60oz)</span></div>
                                <div className="espresso"><span className="ingredient-text-animation">Espresso (30oz)</span></div> */}
                            </div>
                        </div>
                    </div>
                <div className="column">
                </div>
                </div>
              </div>
              {/* END COFFEE MUG */}
          </Col>
        </Row>
        <Row>
          <Col size="xs-6 lg-4">
              <h2 className="selectedRecipeServing">Serving Size: </h2>
          </Col>
          {/* <Col size="xs-12 lg-8">
              <h2 className="selectedRecipeIngredients">Ingredients</h2>
          </Col> */}
        </Row>
        </div>
      </Container>
      </div>
    );
  }
}

export default Recipe;
