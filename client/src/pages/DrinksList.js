import React, { Component } from "react";
import { Link } from "react-router-dom";
import Drinks from "../components/Drinks";
import { Container } from "../components/Grid";
import images from "../images.json";
import "../App.css";
import Navigation from "../components/Shared/Navigation";
import DrinkIconPics from "../components/DrinkIconPics";
import "./style.css";

class DrinksList extends Component {
  state = {
    images
  };

  render() {
    return (
      <Container fluid>
        <div className="background2">
          <Navigation />
          <header className="drinksheader">Espresso Drinks</header>
          <div>
            <DrinkIconPics
              pictures={this.state.images.map(picture => (
                <Link
                  to={{
                    pathname: "/recipe",
                    data: picture.id 
                  }}
                >
                  <Drinks
                    id={picture.id}
                    key={picture.id}
                    name={picture.name}
                    image={picture.image}
                  />
                </Link>
              ))}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export default DrinksList;
