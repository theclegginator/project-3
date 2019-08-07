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
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
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
            <form className='makedrinkform' noValidate autoComplete="off"
              onSubmit={this.handleFormSubmit}
              onChange={this.handleFieldChange}  
            >
          <div>
            <TextField
            required
            id="standard-required"
            label="Drink Name"
            className='drinkName'
            margin="dense"
            value = {this.state.name}
            />
      </div>
      <div>
        {/* <h4> Ingredients </h4> */}
        <div className='btns'>
          <Button variant="contained" size="small" color="primary" className='add' onClick={this.addIngredient}>
            Add Ingredient
          </Button>
          {/* <Fab size="small" color="secondary" aria-label="add" className='icon'>
          <AddIcon />
          </Fab> */}
        </div>
        <FormControl className='ingredientlist'>
          <InputLabel htmlFor="ingredient-native-simple">Ingredient</InputLabel>
            <Select
              native
              // value={state.ingredient}
              // onChange={handleChange('ingredient')}
              inputProps={{
              name: 'ingredient',
              id: 'ingredient-native-simple',
              }}
              >
              <option value="" />
              <option value='Espresso'>Espresso</option>
              <option value='Decaf Drip Brew'>Decaf Drip Brew</option>
              <option value='Drip Brew'>Drip Brew</option>
              <option value='French Press'>French Press</option>
              <option value='Warm Milk'>Warm Milk</option>
              <option value='Condensed Milk'>Condensed Milk</option>
              <option value='Cubano'>Cubano</option>
              <option value='Steamed Milk'>Steamed Milk</option>
              <option value='Hot Chocolate'>Hot Chocolate</option>
              <option value='Foamed Milk'>Foamed Milk</option>
              <option value='Long Pull Espresso'>Long Pull Espresso</option>
              <option value='Whipped Cream'>Whipped Cream</option>
              <option value='Hot Water'>Hot Water</option>
              <option value='Ice Cream'>Ice Cream</option>
            </Select>
        </FormControl>
        <FormControl className='ounces'>
          <InputLabel htmlFor="ounces-native-simple">Ounces</InputLabel>
            <Select
              native
              // value={state.ounces}
              // onChange={handleChange('ounces')}
              inputProps={{
              name: 'ounces',
              id: 'ounces-native-simple',
              }}
              >
              <option value="" />
              <option value={5}>Five</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          id="standard-full-width-multiline-flexible"
          label="Description"
          multiline
          rowsMax="4"
          // value={values.multiline}
          // onChange={handleChange('multiline')}
          className='drinkdescription'
          fullWidth
          style={{ margin: 20 }}
          margin="normal"
        />
      </div>
        <Button variant="contained" size="large" color="primary" className='submit'>
          Add Drink
        </Button>
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
