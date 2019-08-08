import React, { Component } from "react";
import "./style.css";
import { Star, Delete } from '@material-ui/icons'
import API from "../../utils/API"

class BanShops extends Component {

  state = {
    isLoggedIn: false,
    clientId: undefined,
    faveShops: [],
    banShops: []
  }

  componentDidMount() {
    const oktaToken = localStorage.getItem("okta-token-storage")
    // console.log("oktaToken:", oktaToken)

    if (oktaToken) {
      if (JSON.parse(oktaToken).idToken !== undefined) {
        const oktaId = (JSON.parse(localStorage.getItem("okta-token-storage")).idToken.claims)
        console.log("OktaId:", oktaId);
        this.setState({
          clientId: oktaId.sub,
          isLoggedIn: true
        }, () => API.getUserFaves(this.state.clientId)
          .then(res => {
            this.setState({
              faveShops: res.data[0].faveShops,
              banShops: res.data[0].banShops
            })
            console.log("FAVES:", this.state.banShops)
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

handleBan = (shop) => {
  console.log("shopper:",shop)
  const bannedShops = this.state.banShops

  const shopIndex = bannedShops.findIndex(result => result.id === shop.id)
  console.log("Ban Index", shopIndex)

  bannedShops[shopIndex].isBan = false

  API.removeUserBan({ clientId: this.state.clientId, shop: shop })

  this.setState({ banShops: bannedShops })
  console.log("Bandit:", shop.Id)

}



render() {
  return (
    <div className="list-group background4">
      { (!this.state.banShops) ? <h1>You don't currently have any banned shops</h1> : this.state.banShops.map((result) => {

        return (
          <div className="list-group-item" key={result.id}>
            <h2>{result.name}</h2>
            <h3>{result.vicinity}</h3>

            {/* <Delete onClick={() => this.handleBan(result)} /> */}
         

          </div>
        )
      })}
    </div>
  )
}
}
export default BanShops;
