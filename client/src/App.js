import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import DrinksList from './pages/DrinksList';
import Shops from './pages/Shops';
import Recipe from './pages/Recipe';
// import Home from './pages/Home'
import Nav from "./components/Nav"
// import { Container } from "./components/Grid";

import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Navigation from './components/Shared/Navigation';
import Homepage from './components/Home/Homepage';
import RegistrationForm from './components/Auth/RegistrationForm';
import config from './app.config';
import LoginPage from './components/Auth/LoginPage';
import ProfilePage from './components/Auth/ProfilePage';
// import { Link } from "./../../routes";

 




class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav/>
            <Navigation />
            <Switch>
              <Route exact path="/" component={DrinksList} />
              <Route exact path="/shops" component={Shops} />
              <Route exact path="/recipe" component={Recipe} />
              <Route exact path="/home" component={Homepage} />
              <Route path="/login" render={() => <LoginPage baseUrl={config.url} />} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route path="/register" component={RegistrationForm} />
              <SecureRoute path="/profile" component={ProfilePage} />
              {/* <Route exact path="/recipe/:id" component={Recipe} /> */}
            </Switch>
          </div>
        </Router>
     
        </div>
        );
      };
    }
    
    
    export default App;
