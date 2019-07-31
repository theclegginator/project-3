import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
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
        <ul><a href="javascript:void(0)" onClick={this.props.auth.login}>Login</a></ul>
        <ul><Link to="/register">Register</Link></ul>
      </ul>;
    return (
      <nav>
        <ul>
          <ul><Link to="/">Home</Link></ul>
          {authNav}
        </ul>
      </nav>
    )
  }
});