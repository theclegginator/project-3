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
