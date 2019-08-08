import React from "react";
import "./style.css";
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <h1 className='shopstitle'>Find a Dope Coffee Shop and Get Your Fix Now!</h1>

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
        <Button onClick={props.handleFormSubmit} variant="contained" size="small" color="primary"  className="finder">
          Search
        </Button>


      </div>
    </form>
      );
    }
    
    export default SearchForm;
