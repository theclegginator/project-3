import React from "react";
import "./style.css";
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox'


function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <div>
          <h1 className='shopstitle'>Find and Explore Local Coffee Shops!</h1>
        </div>
        <div>
          <Checkbox
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
        <div>
          <input
            onChange={props.handleInputChange}
            value={props.checked ? props.geolocation : props.location}
            name="location"
            type="text"
            className="form-control loco-search"
            placeholder={props.checked ? props.geolocation : "Enter Your Location or Check the Box Above "}
            id="search"
          />
          <Button onClick={props.handleFormSubmit} variant="contained" size="small" color="primary" className="finder">
            Search
        </Button>
        </div>

      </div>
    </form>
  );
}

export default SearchForm;
