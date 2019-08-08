import React, { Component } from "react";
import { Container } from "../components/Grid";
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
    grindSize: [],
    description: [],
    divWidths: 20 + 'rem',
  };

  // setting recipe ID and getting current window size for dynamic styling
  componentDidMount() {
    this.setState({ 
      width: window.innerWidth, // gather window size data from browser
      height: window.innerHeight
    });  
    // set the recipe state equal to the id
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);


    let { data } = this.props.location;
    // data will be undefined if refreshed on this page as the value is retrieved from react router on the Drinks page
    if (data === undefined) {
      let prevRun = sessionStorage.getItem('drinkId')
      if (!prevRun) {
        // default to first drink if no link was followed in react router to get here
        data = 1;
        // if no session data, use default data value
        this.setState({recipe: images[data - 1]}) // data is the id of the coffee recipe
        this.selectedCoffeeRecipe(data);
      }
      else {
        // if session data exists, use that instead
        this.setState({recipe: images[prevRun - 1]})
        this.selectedCoffeeRecipe(prevRun);
      }
    }
    // if session storage has no drink id value, set one
    else {
      sessionStorage.setItem('drinkId', data);
      this.setState({recipe: images[data - 1]}) // data is the id of the coffee recipe
      this.selectedCoffeeRecipe(data);
    }

  }
  
  // Handle resize dynamically
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    // set state for window size to see if we need to restyle the coffee mug div size calculations
    if (this.state.width > 767) {
      this.setState({screenFormat: 'large'});
    }
    else {
      this.setState({screenFormat: 'small'});
    }

    // check the current screen size and div size. If they mismatch, rebuild the mug to ensure the styling is correct
    if (this.state.screenFormat === 'large' && this.state.divWidths !== '20rem') {
      this.selectedCoffeeRecipe(sessionStorage.getItem('drinkId'));
    }
    if (this.state.screenFormat === 'small' && this.state.divWidths === '20rem') {
      this.selectedCoffeeRecipe(sessionStorage.getItem('drinkId'));
    }
  }

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
      animationDelays: animationDelays,
      description: images[id-1].description
    }, () => {
      // This switch case sorts through the possible ingredients and assigns a component name to it
      for (let i = 0; i < this.state.ingredientList.length; i++) {
        if (i === 0) {
          firstIngredient.unshift(true);
        } else {
          firstIngredient.unshift(false);
        }
      }
      this.setState({
        firstIngredient: firstIngredient
      })
    });

   


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
      // Note: for large screens, coffee cup height is 20 rem, hence the calculation below (total height / ingredient ratio). Limiting to 2 decimal places limits screen tear.
      if (window.innerWidth > 767) {
        ingredientHeights.push((20 * (ounces[i] / totalOunces)).toFixed(2));
        this.setState({divWidths: 20 + 'rem',
          screenFormat: 'large'
        });  
      }
      // for smaller screen sizes:
      else {
        ingredientHeights.push((14 * (ounces[i] / totalOunces)).toFixed(2));   
        this.setState({divWidths: 14 + 'rem',
          screenFormat: 'small'
        });   
      }
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

  render() {
    console.log(this.state)
    return (

        <Container fluid>
          <div className="background2">
            < Navigation />
              <h1 className="selectedRecipeTitle text-focus-in">{this.state.recipe.name}</h1>
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
                                width={this.state.divWidths}
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
                    <div className="column" />
                  </div>
                </div>
                {/* END COFFEE MUG */}

                {/* GRIND SIZE MAPPING */}
                <div className='text-wrapper'>
                  <div className='grindsize'>
                    {this.state.ingredientList.reverse().map((dummy, i) => (
                    // map grind size for coffee ingredients only
                      <h2>{this.state.grindSize[i] !== undefined ? 
                        `${this.state.grindSize[i].ingredient} Grind Size: ${this.state.grindSize[i].grind}` : null
                      }</h2>
                    ))}
                  </div>
                  <br></br>
                  {/* BEAN WEIGHT MAPPING */}
                  <div className='beanweight'>
                    {this.state.ingredientList.reverse().map((dummy, i) => (
                      // map ground weight of beans for coffee ingredients only
                      <h2>{this.state.grindSize[i] !== undefined ? 
                        `${this.state.grindSize[i].ingredient} Bean Weight: ${this.state.grindSize[i].weightLow} - ${this.state.grindSize[i].weightHigh} grams` : null
                      }</h2>
                    ))}
                  </div>
                  <br></br>
                  <div className='description'>
                      <h2>{this.state.description !== undefined ? 
                        `${this.state.description}` : null
                      }</h2>
                  </div>
  
                </div>
              </div>
        </Container>
  
    );
  }
}

export default Recipe;
