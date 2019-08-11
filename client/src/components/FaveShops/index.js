import React, { Component } from "react";
import "./style.css";
import { Star, Delete } from '@material-ui/icons'
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
            console.log("FAVES:", this.state.faveShops)
          })
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
      <div className={"list-group background4"}>
        {(!this.state.faveShops[0]) ? <h4>You currently don't have any favorite shops!<br /> Show some BARISSO love!</h4> : this.state.faveShops.map((result) => {

          if (result.isFave = true) {

        return (
            <div className="list-group-item" key={result.id}>
          <h2>{result.name}</h2>
          <h3>{result.vicinity}</h3>
          <Star className={result.isFave ? "fave" : "starry"} onClick={() => this.handleFave(result)} />




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
