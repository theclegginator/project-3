import React, { Component } from "react";
import SearchForm from "../SearchForm";
import ShopList from "../ShopList";
import API from "../../utils/API";
import "./style.css";
import { geolocated } from 'react-geolocated';
import Button from '@material-ui/core/Button';
import { ContactSupportOutlined } from "@material-ui/icons";


class ShopListContainer extends Component {
  state = {
    location: "",
    geolocation: "",
    results: [],
    checked: false,
    shopId: "",
    clientId: "",
    faves: {},
    userDocExists: false,
    key: ""
  };


  componentDidMount() {
    const oktaToken = localStorage.getItem("okta-token-storage")
    if (oktaToken) {
      if (JSON.parse(oktaToken).idToken !== undefined) {
        const oktaId = (JSON.parse(localStorage.getItem("okta-token-storage")).idToken.claims.sub)
        console.log("OktaId:", oktaId);
        this.setState({
          clientId: oktaId,
          isLoggedIn: true
        }, () => API.findUser(this.state.clientId)
          .then(res => {
            const userCheck = res.data
            console.log("userCheck:", userCheck.length)
            if (userCheck.length === 0) {
              API.createUser({
                clientId: this.state.clientId,
                userDrinks: [],
                faveShops: [],
                banShops: []
              })
                .then(res => {
                  this.setState({
                    userDocExits: true
                  })
                  console.log("This guy is a NEWB!")

                })
            }
            else {
              console.log("Hitting User Faves Route")
              API.getUserFaves(this.state.clientId)
                .then(res => {
                  this.setState({
                    faves: res.data
                  })
                  console.log("USER OBJECT:", this.state.faves[0])
                })
            }

          }
          )
        )

      }
    }

  }

  searchGoogle = location => {
    console.log("Q:", location)
    API.findShops(location)
      .then(res => {
        console.log("Results", res);
        const shops = res.data.results
        shops.forEach(shop => {
          console.log("This.State.Faves[0]:", this.state.faves[0])
          // console.log("ShopID",shop.id + " / " + this.state.faves[0].faveShops.indexOf(shop.id))
          shop.isFave = false;
          if (this.state.faves[0]) {
              if (this.state.faves[0].faveShops.indexOf(shop.id) !== -1) {
              shop.isFave = true;

            }
          }

          shop.isBan = false;
          if (this.state.faves[0]) {
            if (this.state.faves[0].banShops.indexOf(shop.id) !== -1) {
              shop.isBan = true
            }
          }

        })
        this.setState({ results: shops })

      })

    console.log("ResultsBACKUP", this.state.results);
  }

  handleTakeMeNow = event => {
    event.preventDefault();
    console.log("Take Me Now Cords:", this.props.coords)
    this.setState({
      geolocation: `${this.props.coords.latitude},${this.props.coords.longitude}`
    }, () => API.findShops(this.state.geolocation)
      .then(res => {
        console.log("Results", res);
        const shop = res.data.results[0];
        const shopLoco = `${shop.name},${shop.vicinity}`
        console.log("Shop Location:", shopLoco)
        console.log("Geolocation:",this.state.geolocation)

        if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1) || (navigator.platform.indexOf("iPod") != -1)) {
          window.open(`maps://maps.google.com/maps/dir/?daddr=${shopLoco}&saddr=${this.state.geolocation}&amp;ll=`);

          // else use Google
        } else {
          window.open(`https://maps.google.com/maps/dir/?daddr=${shopLoco}&saddr=${this.state.geolocation}&amp;ll=&amp;ll=`);

        }
      })
    )
  }


  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  // When the form is submitted, search the Google API for the location specified
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("GeoCheck:", this.state.geolocation)
    console.log("this.state.checked:", this.state.checked)
    if (this.state.checked) {
      console.log("We sendin up that Geolocation to Google")
      this.searchGoogle(this.state.geolocation)
    } else {
      console.log("We fixing to convert that address to coordinates:", this.state.location)



      API.findGeolocation(this.state.location)
        .then(res => {
          const { lat, lng } = res.data.results[0].geometry.location;
          console.log(lat, lng);
          this.setState({
            location: `${lat},${lng}`
          })
          console.log("this.state.location:", this.state.location)
          this.searchGoogle(this.state.location);
        },
          error => {
            console.error(error);
          }
        )

    }



  };

  handleCheck = event => {
    // event.preventDefault();
 
    console.log("Cords:", this.props.coords)
    this.setState({
      geolocation: `${this.props.coords.latitude},${this.props.coords.longitude}`,
      checked: event.target.checked,
    })


    console.log("Checked?", event.target.checked)
    console.log("Geolocation:", this.state.geolocation)

    // this.searchGoogle(`${latitude},${longitude}`)
  }



  render() {
    return (
      <div className='searchform'>
        <div>
          <Button onClick={this.handleTakeMeNow} variant="contained" size="large" color="secondary" className="finder"> Take me to the nearest coffee shop using my Geolocation!
          </Button>
        </div>
        <SearchForm
          search={!this.state.checked ? this.state.location : this.state.geolocation}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          handleCheck={this.handleCheck}
          checked={this.state.checked}
          placeholder={this.state.geolocation}
        />
        {this.state.results.length > 0 ?
          <ShopList
            results={this.state.results}
          /> : null}

      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(ShopListContainer);
