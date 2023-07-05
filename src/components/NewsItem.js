import React from "react";

const NewsItem = ({
  title,
  describtion,
  imgUrl,
  newsUrl,
  aouthor,
  publishedAt,
}) => {
  return (
    <div className="my-3">
      <div className="card">
      
        <img
          src={
            imgUrl
              ? imgUrl
              : "https://mir-s3-cdn-cf.behance.net/projects/404/fd76ea166125209.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{describtion}</p>
          <p className="card-text">
            <small className="text-muted">
              By {aouthor ? aouthor : "Unknown"} on{" "}
              {new Date(publishedAt).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            className="btn btn-dark btn-sm"
            rel="noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
