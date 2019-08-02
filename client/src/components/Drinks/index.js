
import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "./style.css";

function Drinks (props) {
  return(
    <div className="drinksList">
      <div className="espressoList">
        <Link to="/recipe">
          <img className="img-responsive img-thumbnail" alt={props.name} src={require(`../../images/coffee-icons/${props.image}`)}/>
          {/* onClick={() => props.selectedCoffeeRecipe(props.id)} */}
        </Link>
        <h3 className="drinkName">{props.name}</h3>
      </div>
    </div>
  )
}
  export default Drinks;
  