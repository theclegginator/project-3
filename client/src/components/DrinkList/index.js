import React from "react";
import "./style.css";

const DrinkList = props => (
    <div className="drinksList">
      <div className="espressoList">
        <img className=" img-responsive img-thumbnail" alt={props.name} src={props.image} onClick={() => props.allDrinks(props.id)}/>
      </div>
    </div>
  );
  export default DrinkList;
  