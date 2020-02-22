import React from "react";

const BookCard = ( { bookID, title, infoLink, authors, publisher, imageLinks }) => (
  <div className="book-card-container border-primary mb-3">
    <div className="image-container">
      <div
        className="bg-image"
        style={
          imageLinks
            ? { backgroundImage: `url(${imageLinks.thumbnail})` }
            : {
                backgroundImage: `url(https://www.nocowboys.co.nz/images/v3/no-image-available.png)`
              }
        }
      />
    </div>
    <div className="book-info">
      <h2>Book Details</h2>
      <div>
        <h1>{title}</h1>

        <small>Authors: {authors ? authors : 'No information'}</small>
      </div>
      <h4>Published by: {publisher ? publisher : 'No information'}</h4>
      <a href={infoLink} className="badge badge-pill badge-secondary" rel="noopener noreferrer" target="_blank">
        More info
      </a>
    </div>
  </div>
);

export default BookCard;
