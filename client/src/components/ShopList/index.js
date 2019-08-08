import React, { Component } from "react";
import "./style.css";
import { Star, Delete } from '@material-ui/icons'
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



  handleFave = (shopId) => {
    const { results } = this.props
    // console.log("ShopId", shopId)

    const shopIndex = results.findIndex(result => result.id === shopId)
    console.log("Index", shopIndex)
    results[shopIndex].isFave = !results[shopIndex].isFave
    { (results[shopIndex].isFave) ? API.addUserFave(this.state.clientId, shopId) : API.removeUserFave(this.state.clientId, shopId) }
    console.log("Shoppy:", shopId)
    this.setState({ results })
  }

  handleBan = (shopId) => {
    const { results } = this.props
    console.log("ShopId", shopId)

    const shopIndex = results.findIndex(result => result.id === shopId)
    console.log("Index", shopIndex)
    results[shopIndex].isBan = !results[shopIndex].isBan
    { (results[shopIndex].isBan) ? API.addUserBan(this.state.clientId, shopId) : API.removeUserBan(this.state.clientId, shopId) }
    this.setState({ results })
    API.addUserBan(this.state.clientId, shopId)
    console.log("Bandit:", shopId)

  }



  render() {
    return (
      <div className="list-group">
        <hr />
        {this.props.results.map((result) => {

          if (!result.isBan) {

            return (
              <card className="list-group-item" key={result.id}>
                <CardContent>
                <h1 className='shop-name'>{result.name}</h1>
                <h2 className='shop-vicinity'>{result.vicinity}</h2>
                <h3 className='shop-rating'>{result.rating} - {result.user_ratings_total} reviews</h3>
                <h3 className='shop-hours'>{result.opening_hours.open_now}</h3>


                {this.state.isLoggedIn ?
                  <Star className={result.isFave ? "fave" : "starry"} onClick={() => this.handleFave(result.id)} /> : null}
                {this.state.isLoggedIn ?
                  <Delete onClick={() => this.handleBan(result.id)} /> : null}
              
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
