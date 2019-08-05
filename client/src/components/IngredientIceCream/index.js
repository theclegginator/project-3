import React, { Component } from 'react'
import './style.css';

export class IngredientIceCream extends Component {
    render() {
        let delay = `${this.props.animationDelays}s`
        let style = {};
        // if the ingredient is the first in the cup, it should have rounded edges.
        if (this.props.firstIngredient) {
            style = {
                height: this.props.height,
                width: this.props.width,
                lineHeight: this.props.height,
                borderRadius: [0 , 0 , 3 + 'rem', 3 + 'rem'],
            }
        }
        else {
            style = {
                height: this.props.height,
                width: this.props.width,
                lineHeight: this.props.height,
                animationDelay: delay,
            }
        }

        return (
            <div>
                <div className="ice-cream" style={style}>
                    <span className="ingredient-text-animation">{this.props.name} ({this.props.ounces}oz)</span>
                </div>
            </div>
        )
    }
}

export default IngredientIceCream
