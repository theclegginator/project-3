import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./style.css";

class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth
  };

  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="dropdown navigation">
        <Link className="navbar-brand" to="/">
        <h1>DOPE COFFEE NAME HERE!</h1>
        </Link>
        <div className="navbar-item has-dropdown is-active">
          <ul className="navbar-nav">
            <li className="navbar-link">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                to="/"
              >
                Drink List
              </Link>

            </li>
            <div className="navbar-dropdown">
              <li className="navbar-item">
                <Link
                  onClick={this.toggleNav}
                  className={window.location.pathname === "/shops" ? "nav-link active" : "nav-link"}
                  to="/shops"
                >
                  Search
              </Link>

              </li>
              <li className="navbar-item">
                Find Coffee
                </li>
            </div>
            <li className="navbar-item">
              <Link
                onClick={this.toggleNav}
                className={window.location.pathname === "/recipe" ? "nav-link active" : "nav-link"}
                to="/recipe"
              >
                Drinks
              </Link>
            </li>
            </ul>
            </div>

      
      </nav>

        );
      }
    }
    
    export default Nav;
