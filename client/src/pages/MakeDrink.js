import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Drinks from "../components/Drinks";
import { Container } from "../components/Grid";
// import images from "../images.json";
import "../App.css";
import Navigation from "../components/Shared/Navigation";
// import DrinkIconPics from "../components/DrinkIconPics";
import "./style.css";

class MakeDrink extends Component {
  state = {
    
  };

  render() {
    return (
      <Container fluid>
        <div className="background2">
          <Navigation />
          <div>
          </div>
        </div>
      </Container>
    );
  }
}

export default MakeDrink;
