import "../App.css";
import "./style.css";
import API from "../utils/API";
import images from "../images.json";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import Drinks from "../components/Drinks";
import createDrink from "../createDrink.json";
import { Container } from "../components/Grid";
import DrinkIconPics from "../components/DrinkIconPics";
import Navigation from "../components/Shared/Navigation";

class DrinksList extends Component {
  state = {
    images,
    createDrink,
    isLoggedIn: false,
    clientId: undefined,
    userDrinks: []
  };

  componentDidMount() {
    const oktaToken = localStorage.getItem("okta-token-storage")
    if (oktaToken !== undefined && JSON.parse(oktaToken).idToken !== undefined) {
      const oktaId = (JSON.parse(localStorage.getItem("okta-token-storage")).idToken.claims.sub)
      this.setState({
        clientId: oktaId,
        isLoggedIn: true
      }, () => 
        API.getAllUserDrinks(this.state.clientId)
          .then(res => {
            console.log("results:", res.data)
            // this.setState({
            //   userDrinks: res.data.userDrinks
            // })
          })
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

          {/* Also load a section below with user created drinks */}
          {this.state.isLoggedIn && this.state.userDrinks !== undefined ?
          <div>
            <header className="drinksheader">User Creations</header>
              <DrinkIconPics
                pictures={this.state.userDrinks.map(userDrink => (
                  <Link
                    to={{
                      pathname: "/recipe",
                      data: userDrink.id 
                    }}
                  >
                    <Drinks
                      id={userDrink.id}
                      key={userDrink.id}
                      name={userDrink.name}
                      image={userDrink.image}
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
