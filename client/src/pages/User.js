import React from 'react';
import { withAuth } from '@okta/okta-react';
import Navigation from '../components/Shared/Navigation';
import { Container } from "../components/Grid";
import FaveShops from "../components/FaveShops";
import BanShops from "../components/BanShops";
import API from "../utils/API";
import "./style.css";

class User extends React.Component {

  state = {
    clientId: "",
    isLoggedIn: false,
    faves: {},
    user: ""
  }

  componentDidMount() {
    const oktaToken = localStorage.getItem("okta-token-storage")
    // console.log("oktaToken:", oktaToken)
    if (oktaToken) {
      if (JSON.parse(oktaToken).idToken !== undefined) {
        const oktaId = (JSON.parse(localStorage.getItem("okta-token-storage")).idToken.claims)
        console.log("OktaId:", oktaId);
        this.setState({
          clientId: oktaId.sub,
          isLoggedIn: true,
          user: oktaId.name
        }, () => API.getUserFaves(this.state.clientId)
          .then(res => {
            this.setState({
              faves: res
            })
            console.log("FAVES:", this.state.faves)
            console.log("NAME:", this.state.user)
          })
        )
      }

    }
  }

  // constructor(props) {
  //   super(props);
  //   this.state = { user: null };
  //   this.getCurrentUser = this.getCurrentUser.bind(this);
  // }
  // async getCurrentUser() {
  //   this.props.auth.getUser()
  //     .then(user => this.setState({ user }));
  //   // const accessToken = await this.props.auth.getAccessToken();
  //   // const userinfo = await this.props.auth.getUser(accessToken);
  //   // console.log(userinfo.sub)
  // }
  // componentDidMount() {
  //   this.getCurrentUser();
  // }
  render() {
    // if (!this.state.user) return null;
    return (
      <Container fluid >

        <div className='background3 user-profile'>
          <Navigation />
          <div className="user-info">
            <h1>Hi {this.state.user}!</h1>
          </div>
    
          <div>
            <h1 className="fave-shops">Here are Your Favorite Coffee Shops</h1>
          </div>
          <div>
            <FaveShops />
          </div>
          <div className="user-info">
       
            <h1>Here are Your Banned Coffee Shops</h1>
            <div>
              <BanShops />
            </div>

          </div>
        </div>
      </Container>



    )
  }
}

export default User