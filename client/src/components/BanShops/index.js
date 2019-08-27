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
                  console.log("This guy is a NEWB!")
                  })
                  

               
            }
            else {
              console.log("Hitting User Faves Route")
              API.getUserFaves(this.state.clientId)
                .then(res => {
                  this.setState({
                    faveShops: res.data[0].faveShops,
                    banShops: res.data[0].banShops
                  })
                  // console.log("USER OBJECT:", this.state.faves[0])
                })
            }

          }
          )
        )

      }
    }

  }

  handleBan = (shop) => {
    console.log("shopper:", shop)
    const bannedShops = this.state.banShops

    const shopIndex = bannedShops.findIndex(result => result.id === shop.id)
    console.log("Ban Index", shopIndex)

    bannedShops[shopIndex].isBan = false
    console.log("BS:", bannedShops[shopIndex].isBan)
    API.removeUserBan({ clientId: this.state.clientId, shop: shop })

    this.setState({ banShops: bannedShops })
    console.log("Bandit:", this.state.banShops[shopIndex])

  }



  render() {
    return (
      <div className={"ban-group background4"}>
        
        {(!this.state.banShops[0]) ? <h4>You currently don't have any banned shops! <br /> We hope all the coffee is good!</h4> : this.state.banShops.map((result) => {

          if (result.isBan) {

            return (
              <div className="ban-item" key={result.id}>
                <h2>{result.name}</h2>
                <h3>{result.vicinity}</h3>

                <Delete className="dump" onClick={() => this.handleBan(result)} />


              </div>
            )
          } else {
            return (
              null)
          }
        })}
      </div>
    )
  }
}
export default BanShops;
