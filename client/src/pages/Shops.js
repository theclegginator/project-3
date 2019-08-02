import React, { Component } from 'react';
import ShopListContainer from "../components/ShopListContainer";
import Navigation from '../components/Shared/Navigation';
import "./style.css";

class Shops extends Component {


    render() {
        return (
            <div className='background2'>
                <Navigation />
                <div>
                    <ShopListContainer />
                </div>
            </div>
        );
    }
};

export default Shops;