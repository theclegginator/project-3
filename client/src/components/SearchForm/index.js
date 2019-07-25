import React, { Component } from "react";
import "./style.css";


function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <h2>Find a Dope Coffee Shop and Get Your Fix Now!</h2>
        <input
          onChange={props.handleInputChange}
          value={props.location}
          name="location"
          type="text"
          className="form-control"
          placeholder="Enter Your Location"
          id="search"
        />
        <button onClick={props.handleFormSubmit} className="btn btn-primary mt-3">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
