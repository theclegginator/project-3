import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import "./style.css";


export default withAuth(class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }
  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }
  componentDidUpdate() {
    this.checkAuthentication();
  }
  render() {
    if (this.state.authenticated === null) return null;
    const authNav = this.state.authenticated ?
      <ul className="auth-nav">
        <ul><a href="javascript:void(0)" onClick={this.props.auth.logout}>Logout</a></ul>
        <ul><Link to="/profile">Profile</Link></ul>
      </ul> :
      <ul className="auth-nav">
        {/* <ul ><a className="header-nav__item" href="javascript:void(0)" onClick={this.props.auth.login} >Login</a></ul> */}
        {/* <ul><Link to="/register">Register</Link></ul> */}
      </ul>;
    return (
      <nav className='nav'>
        <ul>
         <Link className="header-nav__item" to="/">Home</Link>
          <Link className="header-nav__item" to="/Drinks/">Drinks</Link>
          <Link className="header-nav__item" to="/Login/">Login</Link>
         <Link className="header-nav__item" to="/Shops/">Search</Link>
          {authNav}
        </ul>
      </nav>
    )
  }
});