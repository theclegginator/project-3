import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import images from "../images.json";
import "../components/Mug/style.css"; //style properties from mug component
import IngredientMilk from "../components/IngredientMilk";
import IngredientWater from "../components/IngredientWater";
import IngredientCoffee from "../components/IngredientCoffee";
import IngredientIceCream from "../components/IngredientIceCream";
import IngredientHotChoc from "../components/IngredientHotchoc";
import IngredientEspresso from "../components/IngredientEspresso";
import IngredientFoamedMilk from "../components/IngredientFoamedMilk";
import IngredientSteamedMilk from "../components/IngredientSteamedMilk";
import IngredientWhippedCream from "../components/IngredientWhippedCream";
import IngredientCondensedMilk from "../components/IngredientCondensedMilk";
import Navigation from '../components/Shared/Navigation';
import "./style.css";
import Auth from "@okta/okta-react";

class Recipe extends Component {
  
  state = {
    images,
    recipe: {},
    ingredientList: [],
    ounces: [],
    firstIngredient: [],
    divHeights: [],
    headFirst: [],
    animationDelays: [],
    grindSize: []
  };

  selectedCoffeeRecipe = id => {
    console.log("id = " + id);
    let drinkSelection = images[id - 1];
    let ingredients = drinkSelection.ingredients;
    const keys = []; // array for ingredient key values
    const ounces = []; // array for measurements of each ingredient
    const ingredientHeights = []; // array for the height in rem of each CSS component in the coffee cup
    const firstIngredient = [];
    const headTitles = [];
    const animationDelays = [];
    const grindSize = [];

    for (let k in ingredients) keys.push(k);
    let ingredientKeys = [];
    for (let i = 0; i < keys.length; i++) {
      ingredientKeys.unshift(keys[i]);
      animationDelays.unshift(i * 0.6);
    }
    this.setState({
      ingredientList: ingredientKeys,
      animationDelays: animationDelays
    });

    // This switch case sorts through the possible ingredients and assigns a component name to it
    for (let i = 0; i < keys.length; i++) {
      if (i === 0) {
        firstIngredient.push(true);
      } else {
        firstIngredient.push(false);
      }
    }

    // GET THE OUNCE MEASUREMENTS OF THE DRINKS
    for (let q in ingredients) {
      if (ingredients.hasOwnProperty(q)) {
        let measurement = ingredients[q];
        ounces.unshift(measurement);
      }
      this.setState({ ounces: ounces });
    }

    // Get the total number of fluid ounces for the drink
    let totalOunces = ounces.reduce((a, b) => a + b, 0);

    for (let i = 0; i < ounces.length; i++) {
      // Note: total rem height for coffee cup is 20 rem, hence the calculation below (total height / ingredient ratio). Limiting to 2 decimal places limits screen tear.
      ingredientHeights.push((20 * (ounces[i] / totalOunces)).toFixed(2));
    }
    this.setState({ divHeights: ingredientHeights });

    // CONSTRUCT THE CUP
    for (let i = 0; i < keys.length; i++) {
      switch (keys[i]) {
        case "Decaf Drip Brew":
        case "Drip Brew":
          headTitles.unshift(IngredientCoffee);
          grindSize.push({ingredient: keys[i],
            grind: "Medium",
            weightLow: Math.round((((1/18)*ounces.slice().reverse()[i]))),
            weightHigh: Math.round((((1/15)*ounces.slice().reverse()[i]))),
          });
          break;
        case "French Press":
            headTitles.unshift(IngredientCoffee);
            grindSize.push({ingredient: keys[i],
            grind: "Coarse",
            weightLow: Math.round(((0.0766*ounces.slice().reverse()[i]))), 
            weightHigh: Math.round(((0.1*ounces.slice().reverse()[i])))
          });
          break;
        case "Foamed Milk":
          headTitles.unshift(IngredientFoamedMilk);
          break;
        case "Steamed Milk":
          headTitles.unshift(IngredientSteamedMilk);
          break;
        case "Warm Milk":
          headTitles.unshift(IngredientMilk);
          break;
        case "Condensed Milk":
          headTitles.unshift(IngredientCondensedMilk);
          break;
        case "Espresso":
        case "Long Pull Espresso":
        case "Cubano":
          headTitles.unshift(IngredientEspresso);
          grindSize.push({ingredient: keys[i], 
              grind: "Fine", 
              weightLow: Math.round(((7*ounces.slice().reverse()[i])/30)), 
              weightHigh: Math.round(((9*ounces.slice().reverse()[i])/30))
            });
          break;
        case "Hot Chocolate":
          headTitles.unshift(IngredientHotChoc);
          break;
        case "Whipped Cream":
          headTitles.unshift(IngredientWhippedCream);
          break;
        case "Hot Water":
          headTitles.unshift(IngredientWater);
          break;
        case "Ice Cream":
          headTitles.unshift(IngredientIceCream);
          break;

        default:
          console.log("Error! No ingredients found in recipe.");
      }
    }
    // sets the components in the order in which they should be made
    this.setState({ headFirst: headTitles , grindSize: grindSize});
  };  

  componentDidMount() {
    let { data } = this.props.location;
    if (data === undefined) {
      // default to espresso if no link was followed in react router to get here
      data = 1;
    }
    // data is the id of the coffee recipe
    this.setState({ recipe: images[data - 1] }); // set the recipe state equal to the id
    this.selectedCoffeeRecipe(data);
  }

  render() {
    return (             
        <Container fluid className="background1">
          <div className="background2">       
            < Navigation />
              <h1 className="selectedRecipeTitle">{this.state.recipe.name}</h1>           
                {/* COFFEE MUG */}
                <div className="container mug-wrapper">
                  <div className="columns">
                    <div className="column" />
                    <div className="column">
                      {/* Area for steam directly above the mug */}
                      <div id="steam-engine">
                        <div className="steam-right" />
                        <div className="steam-center" />
                        <div className="steam-left" />
                      </div>
                      <div id="drink">
                        {/* Are for the mug, will contain each ingredient */}
                        <div className="mug">
                          <div className="mug-handle" />
                          <div className="air">air</div>
                          {/* MAP THE COMPONENT ARRAY FOR EACH INGREDIENT */}
                          <div>
                            {this.state.headFirst.map((Component, i) => (
                              <Component
                                key={i}
                                height={this.state.divHeights[i] + "rem"}
                                firstIngredient={this.state.firstIngredient[i]}
                                name={this.state.ingredientList[i]}
                                ounces={this.state.ounces[i]}
                                animationDelays={this.state.animationDelays[i]}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div/>
                  </div>
                </div>
                {/* END COFFEE MUG */}        
                {/* GRIND SIZE MAPPING */}
                <div>
                  {this.state.ingredientList.reverse().map((dummy, i) => (
                  // map grind size for coffee ingredients only
                    <h2 className='ingredientstext'>{this.state.grindSize[i] !== undefined ? 
                      `${this.state.grindSize[i].ingredient} Grind Size: ${this.state.grindSize[i].grind}` : null
                    }</h2>
                  ))}
                </div>
                {/* BEAN WEIGHT MAPPING */}
                <div>
                  {this.state.ingredientList.reverse().map((dummy, i) => (
                    // map ground weight of beans for coffee ingredients only
                    <h2 className='ingredientstext'>{this.state.grindSize[i] !== undefined ? 
                      `${this.state.grindSize[i].ingredient} Bean Weight: ${this.state.grindSize[i].weightLow} - ${this.state.grindSize[i].weightHigh} grams` : null
                    }</h2>
                  ))}
                </div>
                 </div>
        </Container>  
    );
  }
}

export default Recipe;
