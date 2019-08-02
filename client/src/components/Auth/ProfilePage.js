import React from 'react';
import { withAuth } from '@okta/okta-react';
export default withAuth(class ProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state = { user: null };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }
  async getCurrentUser(){
    this.props.auth.getUser()
      .then(user => this.setState({user}));
      // const accessToken = await this.props.auth.getAccessToken();
      // const userinfo = await this.props.auth.getUser(accessToken);
      // console.log(userinfo.sub)
  }
  componentDidMount(){
    this.getCurrentUser();
  }
  render() {
    if(!this.state.user) return null;
    return (
      <section className="user-profile">
        <h1>User Profile</h1>
        <div>
          <label>Name:</label>
          <span>{this.state.user.name}</span>
        </div>
      </section>
    )
  }
});