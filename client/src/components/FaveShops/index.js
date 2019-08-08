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
    const { results } = this.props
    console.log("ShopId", shop.id)
    console.log("ResultId", results[0])
    const shopIndex = results.findIndex(result => result.id === shop.id)
    console.log("Index", shopIndex)
    console.log("Fave Result", shop)
    results[shopIndex].isFave = false
    API.removeUserFave({ clientId: this.state.clientId, shop: shop })
    //   console.log("Shoppy:", shopId)
    this.setState({ results })
  }


  render() {
    return (
      <div className="list-group background4">
        { (!this.state.faveShops) ? <h1>You don't currently have any favorite shops</h1> : this.state.faveShops.map((result) => {

          return (
            <div className="list-group-item" key={result.id}>
              <h2>{result.name}</h2>
              <h3>{result.vicinity}</h3>

              {/* <Delete onClick={() => this.handleFave(result)} />
            */}

            </div>
          )
        })}
      </div>
    )
  }
}
export default FaveShops;
