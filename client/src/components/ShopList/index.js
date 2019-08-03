import React, { Component } from "react";
import "./style.css";
import { Star, Delete } from '@material-ui/icons'

class ShopList extends Component {

  handleFave = (shopId) => {
    const userInfo = (JSON.parse(localStorage.getItem("okta-token-storage")).idToken.clientId);
    console.log(userInfo)
    console.log("Shoppy:", shopId)
  }

  render() {
    return (
      <div className="list-group">
        <hr />
        {this.props.results.map(result => (
          <div className="list-group-item" key={result.id}>
            <h1>{result.name}</h1>
            <h2>{result.vicinity}</h2>
            <h3>{result.rating} - {result.user_ratings_total} reviews</h3>
            <h3>{result.opening_hours.open_now}</h3>
            <Star onClick={() => this.handleFave(result.id)} />  |  <Delete data-id={result.id} />
            <hr />

          </div>
        ))}
      </div>
    )
  }
}

export default ShopList;
