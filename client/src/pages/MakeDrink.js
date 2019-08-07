import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Drinks from "../components/Drinks";
import { Container } from "../components/Grid";
// import images from "../images.json";
import "../App.css";
import Navigation from "../components/Shared/Navigation";
// import DrinkIconPics from "../components/DrinkIconPics";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import "./style.css";

class MakeDrink extends Component {
  state = {
    
  };

  render() {
    return (
      <Container fluid>
        <div className="background1">
          <Navigation />
          <div>
            <h1 className='createdrinktitle'>Create Custom Drink</h1>
          <form className='makedrinkform' noValidate autoComplete="off">
      <TextField
          required
          id="standard-required"
          label="Drink Name"
          // defaultValue="Hello World"
          className='drinkName'
          margin="normal"
      />
        <TextField
        id="standard-number"
        label=""
        // value={values.ounces}
        // onChange={handleChange('ounces')}
        type="number"
        className='ounces'
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      </form>
          </div>
        </div>
      </Container>
    );
  }
}

export default MakeDrink;

// (DONE) 1. Dynamically load an 'create drink' icon at the bottom by checking if they are logged in or not.
// (DONE) 2. Make it a Link to via react router to send the user to MakeDrink.js
// (VYJOO WORKING ON) 3. MakeDrink.js will have a bunch of fields to fill out: Name of Drink, Ingredients, ounces per ingredient, and description
// (VYJOO WORKING ON) 3.5 Additionally, a drink can have a different number of ingredients. So the form should start with one field, then allow them to add up to 5 ingredients.
// 4. Then there should be a form submit button. When they click this, it should run an API post route to post the drink details in a JSON object to the database for that client ID.
// =====
// 5. Back on the drink list homepage, we should run an API call for get all drinks that the user has made only if they are logged in.
// 6. This API route will then return an array of JSON objects render a DrinksListIcon for each. Use mapping and map some prop like id to the drink icon component.
// ===== 
// 7. When the user clicks a drink icon component, it should use the same Link To form of other drinks, but instead of passing a static ID from our JSON array, it will pass the Mongo ID.
// 8. It should then run through all the same functions and build the drink.
