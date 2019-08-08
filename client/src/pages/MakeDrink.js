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
  componentDidMount() {
    const oktaToken = localStorage.getItem("okta-token-storage");
    if (oktaToken) {
      if (JSON.parse(oktaToken).idToken !== undefined) {
        const oktaId = (JSON.parse(localStorage.getItem("okta-token-storage")).idToken.claims.sub)
        this.setState({
          clientId: oktaId,
          isLoggedIn: true
        })
        }
      }
    }
    
  constructor() {
    // const classes = useStyles();
    super();
    this.state = {
      name: "",
      ingredients: [{}],
      description: ""
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
    console.log(this.state)
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
    console.log(this.state)
  };

  // handleingredientNameChange = id => event => {
  //   const newingredient = this.state.ingredients.map((ingredient, sidx) => {
  //     // if (id !== sidx) return ingredient;
  //     // let temp = this.state.ingredients;
  //     newingredient[`test`] = 30;
  //     console.log(newingredient)
  //     return {newingredient};
  //   });
  //   // obj["key3"] = "value3";

  //   this.setState({ ingredients: newingredient });
  //   console.log(this.state) 
  // };

  handleSubmit = event => {
    // const { name, ingredients } = this.state;
    console.log(
      "okay"
    )
  };

  // handleaddingredient= () => {
  //   this.setState({
  //     ingredients: this.state.ingredients.concat([{}])
  //   });
  // };
  // handleRemoveingredient = id => () => {
  //   this.setState({
  //     ingredients: this.state.ingredients.filter((e, sidx) => id !== sidx)
  //   });
  // };

  render() {
    // const classes = useStyles();

    return (
      <Container fluid>
      <div className="background3">
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
        {this.state.ingredients.map((ingredient, id) => (
          <div className="ingredientlist">
           <FormControl className='ingredientlist'>
          <InputLabel htmlFor="ingredient-native-simple">Ingredient</InputLabel>
            <Select
              native
              value={ingredient.name}
              // onChange={this.handleingredientNameChange(ingredient.name)}              
              inputProps={{
              name: 'ingredients',
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
          // onChange={this.handleingredientNameChange(id)}
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
          value = {this.state.description}
          onChange={this.handleDescriptionChange}
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
