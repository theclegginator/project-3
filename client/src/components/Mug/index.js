import React, { Component } from 'react'

import "./style.css";

function Mug({ props }) {
        return (
            <div className="container wrapper">
            <div className="columns">
                <div className="column"></div>
                <div className="column">
                    {/* Area for steam directly above the mug */}
                    <div id="steam-engine">
                        <div className="steam-right"></div>
                        <div className="steam-center"></div>
                        <div className="steam-left"></div>
                    </div>
                    <div id="drink">
                        {/* Are for the mug, will contain each ingredient */}
                        <div id="mug">
                            <div className="mug-handle"></div>
                            <div className="air">air</div>
                            <div className="milk"><span className="ingredient-text-animation">Milk (30oz)</span></div>
                            <div className="coffee"><span className="ingredient-text-animation">Coffee (60oz)</span></div>
                            <div className="espresso"><span className="ingredient-text-animation">Espresso (30oz)</span></div>
                        </div>
                    </div>
                </div>
            <div className="column">
            </div>
            </div>
            
        </div>
        )
}

export default Mug
