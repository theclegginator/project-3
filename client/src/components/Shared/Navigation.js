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

    <div className="auth-nav">
        <Link className={"header-nav__item brand"} to="/">BARISSO</Link>
        <Link className="header-nav__item" to="/Drinks/">Drinks</Link>

        <Link className="header-nav__item" to="/Shops/">Shops</Link>
        <Link className="header-nav__item" href="javascript:void(0)" onClick={this.props.auth.logout}>Logout</Link>
        <Link className="header-nav__item" to="/profile">Profile</Link>
      </div> :
   
   <div className="auth-nav">
        <Link className="header-nav__item brand" to="/">BARISSO</Link>
        <Link className="header-nav__item" to="/Drinks/">Drinks</Link>
        {/* <Link className="header-nav__item" to="/Login/">Login</Link> */}
        <Link className="header-nav__item" to="/Shops/">Shops</Link>
        <Link className="header-nav__item" href="javascript:void(0)" onClick={this.props.auth.login} to="/Login/" >Login</Link>
        {/* <ul><Link to="/register">Register</Link></ul> */}
      </div>;

    return (
      <nav className='nav'>
        {authNav}
      </nav>
    )
  }
});