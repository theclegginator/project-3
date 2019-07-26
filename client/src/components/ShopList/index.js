import React from "react";
import "./style.css";

function ShopList(props) {
  return (
    <ul className="list-group">
      {props.results.map(result => (
        <li className="list-group-item" key={result.id}>
          <h1>{result.name}</h1>
          <h2>{result.vicinity}</h2>
          <h3>{result.opening_hours.open_now}</h3>
        </li>
      ))}
    </ul>
  );
}

export default ShopList;
