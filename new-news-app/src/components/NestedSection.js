import React from "react";
export default function NestedSection(props) {
    let { title, description, imageUrl, newsUrl, author, publishedAt} = props;
    return (
      <div className="container card-container">
        <div className="category-news card w-30" >
          <img src={imageUrl} className="card-img-top" alt="CardImage" />
          <div className="card-body">
          <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
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
