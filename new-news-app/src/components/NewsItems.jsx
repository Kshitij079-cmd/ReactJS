// src/components/ItemComponent.js
import React from "react";
export default function NewsItems (props) {
   
  
    let {title, description, imageUrl, newsUrl, publishedAt,author} = props
    return (
      <div className="col-sm item-component">
        <div className="card" >
        <img className="card-img-top" src={imageUrl} alt="Cardimage cap"/>
          <div className="card-body">
            <h5 className="card-title">{title}<b>...</b></h5>
            <p className="card-text">
              {description}...<b>click to</b>
            </p>
            <p className="card-text">
              <small className="text-muted">by {!author?"Unknown": author}</small>
              <small className="text-muted"> at {new Date(publishedAt).toGMTString()}</small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="container btn btn-dark">
            <b>Click to Read More</b>
            </a>
          </div>
        </div>
      </div>
    );
  
}
