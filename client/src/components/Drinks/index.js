
import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "./style.css";

function Drinks (props) {
  return(
    <div className="drinksList">
      <div className="espressoList">
        <Link to="/recipe" className="linkRecipe">
          <img className="img-responsive img-thumbnail" onClick={() => props.selectedCoffeeRecipe(props.id)} alt={props.name} src={props.image}/>
        </Link>
        <h3 className="drinkName img-thumbnail">{props.name}</h3>
      </div>
    </div>
  )
}
  export default Drinks;
  