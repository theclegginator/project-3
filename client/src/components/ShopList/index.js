import React, { Component } from "react";
import "./style.css";
import { Star, Delete } from '@material-ui/icons'
import { isThisHour } from "date-fns";
import API from "../../utils/API"

class ShopList extends Component {

  state = {
    isLoggedIn: false,
    clientId: undefined,
    faves: {}
  }

  componentDidMount() {
    const oktaToken = localStorage.getItem("okta-token-storage")
    console.log("oktaToken:", oktaToken)



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
    console.log("ShopId", shopId)

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
              <div className="list-group-item" key={result.id}>
                <h1>{result.name}</h1>
                <h2>{result.vicinity}</h2>
                <h3>{result.rating} - {result.user_ratings_total} reviews</h3>
                <h3>{result.opening_hours.open_now}</h3>


                {this.state.isLoggedIn ?
                  <Star key={result.id} className={result.isFave ? "fave" : "starry"} onClick={() => this.handleFave(result.id)} /> : null}
                {this.state.isLoggedIn ?
                  <Delete onClick={() => this.handleBan(result.id)} /> : null}
                <hr />

              </div>)
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
