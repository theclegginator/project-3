import React, { Component } from "react";

import { Col, Row, Container } from "../components/Grid";
import Nav from "../components/Nav";
import images from '../images.json';
// import Drinks from './components/Drinks';
// import Container from './components/Container';

class Recipe extends Component {
  state = {
   images,
   recipe : {}

  };

  selectedCoffeeRecipe() {

  }

  render() {
    return (
      <Container fluid>
        <Nav>        
        </Nav>>
        <div className="selectedRecipe">
        <Row>
        <h3 className="selectedRecipeTitle">{this.state.recipe.name }</h3>
          <Col size="md-8 xs-12 md-offset-1">
              <img className="selectedRecipeImg" src={this.state.recipe.image} alt={this.state.recipe.name}/>
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
    );
  }
}

export default Recipe;
