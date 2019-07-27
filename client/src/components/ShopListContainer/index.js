import React, { Component } from "react";
import SearchForm from "../SearchForm";
import ShopList from "../ShopList";
import API from "../../utils/API";
import "./style.css";

class ShopListContainer extends Component {
  state = {
    location: "",
    results: []
  };



  searchGoogle = location => {
    console.log("Q:", location)
    API.findShops(location)
      .then(res => {
        console.log("Results", res);
        this.setState({ results: res.data.results });

      })

      .catch(err => console.log(err));

    console.log("ResultsBACKUP", this.state.results);
  };

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

  render() {
    return (
      <div>
        <SearchForm
          search={this.state.location}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        { this.state.results.length>0 ? 
        <ShopList results={this.state.results}/> : null }
      </div>
    );
  }
}

export default ShopListContainer;
