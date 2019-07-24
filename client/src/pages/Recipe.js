import React, { Component } from "react";

import { Col, Row, Container } from "../components/Grid";
import images from '../images.json';
import Mug from '../components/Mug'
import Drinks from '../components/Drinks'




class Recipe extends Component {
  state = {
   images,
   recipe : {}

  };

  selectedCoffeeRecipe = id => {
    console.log("this is working")
    console.log(id)
  }

  render() {
    return (
      <div>     
      <Container fluid>
        <div className="selectedRecipe">
        <Row>
        <h3 className="selectedRecipeTitle">{this.state.recipe.name }</h3>
          <Col size="md-8 xs-12 md-offset-1">
              <img className="selectedRecipeImg" src={this.state.recipe.image} alt={this.state.recipe.name}/>
              <Drinks selectedCoffeeRecipe={this.selectedCoffeeRecipe}/>
          </Col>
        </Row>
        <Row>
          <Col size="xs-6 lg-4">
              <h2 className="selectedRecipeServing">Serving Size: </h2>
          </Col>
          <Col size="xs-12 lg-8">
              <h2 className="selectedRecipeIngredients">Ingredients</h2>
          </Col>
        </Row>
        </div>
      </Container>
      </div>
    );
  }
}

export default Recipe;
