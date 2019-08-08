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
import { makeStyles } from '@material-ui/core/styles';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import InputAdornment from '@material-ui/core/InputAdornment';
import "./style.css";

const useStyles = makeStyles(theme => ({
  container: {
    background:' #ffffff8c',
    color:'white',
    padding:'50px',
    align:'center',
    display: 'inline-block'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
}));


// const classes = useStyles();
class MakeDrink extends Component {

  constructor() {
    // const classes = useStyles();
    super();
    this.state = {
      name: "",
      ingredient: [{ name: "", weight: ''}]
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleingredientNameChange = id => event => {
    const newingredient = this.state.ingredient.map((ingredient, sidx) => {
      if (id !== sidx) return ingredient;
      return { ...ingredient, name: event.target.value };
    });

    this.setState({ ingredient: newingredient });
  };

  handleSubmit = event => {
    const { name, ingredients } = this.state;
  };

  handleaddingredient= () => {
    this.setState({
      ingredient: this.state.ingredient.concat([{ name: "", weight: '' }])
    });
  };

  handleRemoveingredient = id => () => {
    this.setState({
      ingredient: this.state.ingredient.filter((e, sidx) => id !== sidx)
    });
  };

  render() {
    // const classes = useStyles();

    return (
      <Container fluid>
      <div className="background2">
        <Navigation />
          <div>
            <h1 className='createdrinktitle'>Create Custom Drink</h1>
<div className='makedrinkform'>
      <form className='createdrinkfm' noValidate autoComplete="off" onSubmit={this.handleSubmit}>

        <TextField
            required
            id="standard-required"
            label="Drink Name"
            className='drinkName'
            margin="dense"
            value = {this.state.name}
            onChange={this.handleNameChange}
            />
        {this.state.ingredient.map((ingredient, id) => (
          <div className="ingredientlist">
           <FormControl className='ingredientlist'>
          <InputLabel htmlFor="ingredient-native-simple">Ingredient</InputLabel>
            <Select
              native
              value={ingredient.name}
              onChange={this.handleingredientNameChange(id)}              
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
        <TextField
          id="adornment-weight"
          className='weight'
          label="Weight"
          value={ingredient.weight}
          onChange={this.handleingredientNameChange(id)}
          // helperText="Weight"

          InputProps={{
          endAdornment: <InputAdornment position="end">Oz</InputAdornment>,
          }}
        />
         {/* <DeleteTwoToneIcon className='icn' size='large' onClick={this.handleRemoveingredient(id)}/> */}
          </div>
        ))}
        <Button variant="contained" size="small" color="primary" className='add' onClick={this.handleaddingredient}>
            Add Ingredient
          </Button>
          <TextField
          id="standard-full-width-multiline-flexible"
          label="Description"
          multiline
          rowsMax="4"
          // value={values.multiline}
          // onChange={handleChange('multiline')}
          className='drinkdescription'
          fullWidth
         
          margin="normal"
          />
     
     <div className='adddrink'>
        <Button variant="contained" size="large" color="primary" className='submitbtn'>
          Add Drink
        </Button>
        </div>
      </form>
      </div>
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
