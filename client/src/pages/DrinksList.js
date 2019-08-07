import React, { Component } from "react";
import { Link } from "react-router-dom";
import Drinks from "../components/Drinks";
import { Container } from "../components/Grid";
import images from "../images.json";
import createDrink from "../createDrink.json";
import "../App.css";
import Navigation from "../components/Shared/Navigation";
import DrinkIconPics from "../components/DrinkIconPics";
import "./style.css";

class DrinksList extends Component {
  state = {
    images,
    createDrink,
    isLoggedIn: false,
    clientId: undefined
  };

  componentDidMount() {
    const oktaToken = localStorage.getItem("okta-token-storage")
    if (JSON.parse(oktaToken).idToken !== undefined) {
      const oktaId = (JSON.parse(localStorage.getItem("okta-token-storage")).idToken.clientId)
      this.setState({
        clientId: oktaId,
        isLoggedIn: true
      }, () => console.log(this.state.isLoggedIn)
      )
    }
  }

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

        {/* If user is logged in, show the user creations category */}

          {this.state.isLoggedIn ?
          <div>
            <header className="drinksheader">User Creations</header>
            <DrinkIconPics
              pictures={this.state.createDrink.map(picture => (
                <Link
                  to={{
                    pathname: "/makedrink",
                  }}
                >
                  <Drinks
                    name={"Create New Drink"}
                    image={"add-drink.png"}
                  />
                </Link>
              ))}
            />
          </div>
          : null}
        </div>
      </Container>
      );
  }
}

export default DrinksList;
