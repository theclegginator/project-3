
import React from "react";
import "./style.css";

const Drinks = props => (
    <div className="drinksList">
      <div className="espressoList">
        <img className=" img-responsive img-thumbnail" alt={props.name} src={props.image} onClick={() => props.allDrinks(props.id)}/>
        <h3 className="drinkName img-thumbnail">{props.name}</h3>
      </div>
    </div>
  );
  export default Drinks;
  