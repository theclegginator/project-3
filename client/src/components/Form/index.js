//\\//\\//\\//\\//\\//\\  FORM FOR USERS TO ADD THEIR OWN DRINKS  //\\//\\//\\//\\//\\//\\

import "./style.css";

import React, { Component } from "react";
;
class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    username: "",
    password: ""
  };

  // handle any changes to the input fields
  handleInputChange = event => {

    this.setState({value: event.target.value});
  }

    // Pull the name and value properties off of the event.target (the element which triggered the event)
    // const { name, value } = event.target;

  //   // Set the state for the appropriate input field
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // When the form is submitted, prevent the default event and alert the username and password
  handleFormSubmit = event => {
    event.preventDefault();
    alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
    this.setState({ username: "", password: "" });
  };

  render() {
    return (

      <form>
      \
       <div className="title">LOG IN</div>
       <br></br>

        <label className="username" > 
        {/* Username: {this.state.username}  */}
        </label>
        {/* <i className="fa fa-user"/> */}
        <input
         className="usernameInput"
          type="text"
           
          placeholder="Username"
          name="username"
          value={this.state.onChange}
          onChange={this.handleInputChange}
        />
        <div className="password">
        <p>
          {/* Password: {this.state.password} */}
          </p>
          {/* <i className="fa fa-user"/> */}
        <input className="passwordinput"
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.onChange}
          onChange={this.handleInputChange}
        />
      
        </div>
  
        <button className="loginbtn" onClick={this.handleFormSubmit}>SIGN IN</button>
        <br></br>
        <br></br>

        <div className="forgotpassword" onClick={this.handlef}>Forgot Password?</div>

      </form>
    
    );
  }
}

export default Form;
