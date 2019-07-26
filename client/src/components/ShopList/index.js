import React from "react";
import "./style.css";

function ShopList(props) {
  return (
    <div className="list-group">
      <hr />
      {props.results.map(result => (
        <div className="list-group-item" key={result.id}>
          <h1>{result.name}</h1>
          <h2>{result.vicinity}</h2>
          <h3>{result.rating} - {result.user_ratings_total} reviews</h3>
          <h3>{result.opening_hours.open_now}</h3>
          <hr />
          
        </div>
      ))}
    </div>
  );
}

export default ShopList;
