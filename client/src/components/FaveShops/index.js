import React, { Component } from "react";
import "./style.css";
import { Bookmark, Star, Delete } from '@material-ui/icons'
import API from "../../utils/API"

class FaveShops extends Component {

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
                    faveShops: res.data[0].faveShops,
                    banShops: res.data[0].banShops
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


  handleFave = (shop) => {
    console.log("shopper:", shop)
    const favedShops = this.state.faveShops

    const shopIndex = favedShops.findIndex(result => result.id === shop.id)
    console.log("Fave Index", shopIndex)

    favedShops[shopIndex].isFave = !favedShops[shopIndex].isFave
    console.log("isFave?:", favedShops[shopIndex].isFave)
    console.log("FS:", favedShops[shopIndex])
    API.removeUserFave({ clientId: this.state.clientId, shop: shop })

    this.setState({ faveShops: favedShops })
    console.log("Faved:", this.state.faveShops[shopIndex])
  }


  render() {
    return (
      <div className={"fave-group background4"}>
        {(!this.state.faveShops[0]) ? <h4>You currently don't have any favorite shops!<br /> Show some BARISSO love!</h4> : this.state.faveShops.map((result) => {

          if (result.isFave) {

            return (
              <div className="fave-item" key={result.id}>
                <h2>{result.name}</h2>
                <h3>{result.vicinity}</h3>
                <Bookmark className={result.isFave ? "fave" : "starry"} onClick={() => this.handleFave(result)} />




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
export default FaveShops;
