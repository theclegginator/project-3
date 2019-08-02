import React from "react";
import "./style.css";


function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <h1>Find a Dope Coffee Shop and Get Your Fix Now!</h1>

        <div className="checkform">
          <input 
          onChange={props.handleCheck}
          name="geoloco"
          className="cb"
          type="checkbox"
          id="defaultCheck1"
          checked={props.checked}
          />
            <label className="form-check-label" for="defaultCheck1">
              Search Using my Current Location
            </label>
        </div>

        <input
          onChange={props.handleInputChange}
          value={props.location}
          name="location"
          type="text"
          className="form-control loco-search"
          placeholder="Press Search to Use Your Current Location or Enter a Location"
          id="search"
        />
        <button onClick={props.handleFormSubmit} className="btn btn-primary mt-3 finder">
          Search
        </button>


      </div>
    </form>
      );
    }
    
    export default SearchForm;
