import React from "react";

const EmptyBookCard = () => (
  <div className="book-card-container border-primary mb-3">
    <div className="book-info-empty">
    <i className="fas fa-book-open"></i>
      <h2>Not found!</h2>
      <p>Item not found or search input is empty</p>
      <p>If that's the first time you visit that page than just type in what you're looking for and enjoy.</p>
      <i className="fas fa-book-dead"></i>
    </div>
  </div>
);

export default EmptyBookCard;
