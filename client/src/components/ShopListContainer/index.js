import React, { Component } from "react";
import SearchForm from "../SearchForm";
import ShopList from "../ShopList";
import API from "../../utils/API";
import "./style.css";

class SearchResultContainer extends Component {
  state = {
    location: "",
    results: []
  };



  searchGoogle = location => {
    console.log("Q:",location)
    API.findShops(location)
      .then(res => this.setState({ results: res.data }))
      .catch(err => console.log(err));
      console.log("Results", this.state.results);
      
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
        <ShopList results={this.state.results} />
      </div>
    );
  }
}

export default SearchResultContainer;
