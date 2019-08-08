import React, { Component } from 'react'
import './style.css';

export class IngredientWater extends Component {
    render() {
        let delay = `${this.props.animationDelays}s`
        let style = {};
        // if the ingredient is the first in the cup, it should have rounded edges.
        if (this.props.firstIngredient) {
            style = {
                height: this.props.height,
                width: this.props.width,
                lineHeight: this.props.height,
                borderBottomLeftRadius: 3 + 'rem',
                borderBottomRightRadius: 3 + 'rem'
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
                <div className="water" style={style}>
                    <span className="ingredient-text-animation">{this.props.name} ({this.props.ounces}oz)</span>
                </div>
            </div>
        )
    }
}

export default IngredientWater
