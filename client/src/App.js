import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import DrinksList from './pages/DrinksList';
import Shops from './pages/Shops';
import Recipe from './pages/Recipe';
import Home from './pages/Home'
import Nav from "./components/Nav"
import { Container } from "./components/Grid";

// import { Link } from "./../../routes";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={DrinksList} />
              <Route exact path="/shops" component={Shops} />
              <Route exact path="/recipe" component={Recipe} />
              <Route exact path="/home" component={Home} />
              {/* <Route exact path="/recipe/:id" component={Recipe} /> */}
            </Switch>
          </div>
        </Router>
        <div>
          <Container>


          </Container>
        </div>
        </div>
        );
      };
    }
    
    
    export default App;
