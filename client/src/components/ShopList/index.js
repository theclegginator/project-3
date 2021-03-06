import React, { Component } from "react";
import "./style.css";
import { Bookmark, Directions, Star, Delete } from '@material-ui/icons'
import API from "../../utils/API"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ShopList extends Component {

  state = {
    isLoggedIn: false,
    clientId: undefined,
    faves: {}
  }

  componentDidMount() {
    const oktaToken = localStorage.getItem("okta-token-storage")
    // console.log("oktaToken:", oktaToken)

    if (oktaToken) {
      if (JSON.parse(oktaToken).idToken !== undefined) {
        const oktaId = (JSON.parse(localStorage.getItem("okta-token-storage")).idToken.claims.sub)
        console.log("OktaId:", oktaId);
        this.setState({
          clientId: oktaId,
          isLoggedIn: true
        }, () => API.getUserFaves(this.state.clientId)
          .then(res => {
            this.setState({
              faves: res
            })
            console.log("FAVES:", this.state.faves)
          })
        )
      }
      // API.findUser(this.state.clientId)
      //   .then(res => {
      //     console.log("USER FIND:",res.data)
      //     this.setState({
      //       faves: res.data
      //     })
      //     console.log("FAVES:", this.state.faves)
      //   }

      //   )




    }

  }

  handleFave = (shop) => {
    const { results } = this.props
    console.log("ShopId", shop.id)

    const shopIndex = results.findIndex(result => result.id === shop.id)
    console.log("Index", shopIndex)
    console.log("Fave Result",shop)
    results[shopIndex].isFave = !results[shopIndex].isFave
    { (results[shopIndex].isFave) ? API.addUserFave({clientId:this.state.clientId, shop:shop}) : API.removeUserFave({clientId:this.state.clientId, shop:shop}) }
  //   console.log("Shoppy:", shopId)
    this.setState({ results })
  }

  handleBan = (shop) => {
    const { results } = this.props
    console.log("Ban Result",shop)
    
    const shopIndex = results.findIndex(result => result.id === shop.id)
    console.log("Ban Index", shopIndex)
    results[shopIndex].isBan = true
    { (results[shopIndex].isBan) ? API.addUserBan({clientId:this.state.clientId, shop:shop}) : API.removeUserBan({clientId:this.state.clientId, shop:shop}) }
    this.setState({ results })
    console.log("Bandit:", shop.Id)

  }

  goToShop = (geolocation, location, shop) => {

    if (location) {
      console.log("Loco:", location)
      if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1) || (navigator.platform.indexOf("iPod") != -1)) {
        window.open(`maps://maps.google.com/maps/dir/?daddr=${shop}&saddr=${location}&amp;ll=`);

        // else use Google
      } else {
        window.open(`https://maps.google.com/maps/dir/?daddr=${shop}&saddr=${location}&amp;ll=&amp;ll=`);

      }
    } else {
      if ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPad") != -1) || (navigator.platform.indexOf("iPod") != -1)) {
        window.open(`maps://maps.google.com/maps/dir/?daddr=${shop}&saddr=${geolocation}&amp;ll=`);

        // else use Google
      } else {
        window.open(`https://maps.google.com/maps/dir/?daddr=${shop}&saddr=${geolocation}&amp;ll=&amp;ll=`);

      }
    }

  }


  render() {
    return (
      <div className="list-group">
        <hr />
        {this.props.results.map((result) => {

          if (!result.isBan) {

            return (
              <card className="list-group-item" key={result.id}>
                <CardContent className='cardcontent'>
                <h1 className='shop-name'>{result.name}</h1>
                <h2 className='shop-vicinity' onClick={() => this.goToShop(this.props.geolocation,this.props.location,result.vicinity)}>{result.vicinity} <Directions /></h2>
                <h3 className='shop-rating'>{result.rating}&#9733; - {result.user_ratings_total} Google reviews</h3>
                {/* <h3 className='shop-hours'>{result.opening_hours.open_now}</h3> */}


                {this.state.isLoggedIn ?
                  <Bookmark className={result.isFave ? "fave" : "starry"} onClick={() => this.handleFave(result)} /> : null}
                {this.state.isLoggedIn ?

                  <Delete className="dump" onClick={() => this.handleBan(result)} /> : null}
                <hr />
                </CardContent>
              </card>)

          } else {

            return (
              null)
          }
        })}
      </div>
    )
  }
}

export default ShopList;
