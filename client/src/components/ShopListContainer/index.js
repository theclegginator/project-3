import React, { Component } from "react";
import SearchForm from "../SearchForm";
import ShopList from "../ShopList"
import API from "../../utils/API";
import "./style.css";
import { geolocated } from 'react-geolocated';



class ShopListContainer extends Component {
  state = {
    location: "",
    results: [],
    checked: false,
    shopId: "",
    clientId: "",
    faves: {},
    userDocExists: false,
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
          console.log("userCheck:",userCheck.length)
          if  (userCheck.length === 0) {
             API.createUser({
               clientId: this.state.clientId,
               userDrinks: [],
               faveShops: [],
               banShops: []
             })
             .then(res => {
              this.setState({
                userDocExits:true
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
        const shops = res.data.results;
        shops.forEach(shop => {

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

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchGoogle(this.state.location);
  };

  handleCheck = event => {
    const { latitude, longitude } = this.props.coords
    event.preventDefault();
    this.setState({
      checked: event.target.checked
    })
    console.log(event.target.checked)
    this.searchGoogle(`${latitude},${longitude}`)
  }



  render() {
    return (
      <div className='searchform'>
        <SearchForm
          search={this.state.location}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          handleCheck={this.handleCheck}
          checked={this.state.checked}
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
