import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./style.css";

class Nav extends Component {
  // state = {
  //   open: false,
  //   width: window.innerWidth
  // };

  navClick () {
    const wrapper = document.getElementById('wrapper');
    wrapper.classList.toggle('is-nav-open')
  }

  // updateWidth = () => {
  //   const newState = { width: window.innerWidth };

  //   if (this.state.open && newState.width > 991) {
  //     newState.open = false;
  //   }

  //   this.setState(newState);
  // };

  // toggleNav = () => {
  //   this.setState({ open: !this.state.open });
  // };

  // componentDidMount() {
  //   window.addEventListener("resize", this.updateWidth);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateWidth);
  // }

  render() {
    return (
      <div id="wrapper" className="wrapper">
      <div className="nav">
        <i className="fa fa-coffee" type="menu-fold" onClick={() => this.navClick()} />
        <div className="navlink">
        <Link className="header-nav__item" to="/">Drinks</Link>
            <Link className="header-nav__item" to="/Shops/">Search</Link>
            <Link className="header-nav__item" to="/Home/">Login</Link>

        
{/*  

            <li className="navbar-link">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                to="/"
              >
                Drink List
              </Link>

            </li>
            
              <li className="navbar-item">
                 <Link
                  onClick={this.toggleNav}
                  className={window.location.pathname === "/shops" ? "nav-link inactive" : "nav-link"}
                  to="/shops"
                >
                  Search
              </Link>

              </li>
              <li className="navbar-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/home" ? "nav-link active" : "nav-link"}
                to="/home"
              >
                Login
              </Link>
                </li>
      
            <li className="navbar-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/recipe" ? "nav-link active" : "nav-link"}
                to="/recipe"
              >
                Drinks
              </Link>
            </li>
           */}
        </div>

      </div>
   </div>





      // <nav className="navbar" role="navigation" aria-label="dropdown navigation">
      //   <Link className="navbar-brand" to="/">
      //   <h1>DOPE COFFEE NAME HERE!</h1>
      //   </Link>
      //   <div className="navbar-item has-dropdown is-active">

      //       </div>

      
      // </nav>

        );
      }
    }
    
    export default Nav;
