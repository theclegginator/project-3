import React, { Component } from 'react';
import ShopListContainer from "../components/ShopListContainer";
import Navigation from '../components/Shared/Navigation';
import { Container } from "../components/Grid";
import "./style.css";

class Shops extends Component {


    render() {
        return (
            <Container fluid >
                <div className='background1'>
                    <Navigation />
                    <div>
                        <ShopListContainer />
                    </div>
                </div>
            </Container>
        );
    }
};

export default Shops;