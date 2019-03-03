import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class BooksList extends React.Component {
    state = {
        booksList: ['EJF5DwAAQBAJ'],
        searchTerm: ''
    };

    search = event => {
        event.preventDefault();
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}&key=AIzaSyAmt5YReWJ39vXhNVGufgGKxkVfxHg0Z_A`
            )
            .then(res => res.data)
            .then(res => {
                console.log(res.items);
                if (!res.items) {
                this.setState({ booksList: [] });
                return;
            }

                const booksList = res.items.map(book => book.id);
                this.setState({
                    booksList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        const { booksList } = this.state;

        return (
            <div>
                <form onSubmit={this.search}>
                    <input
                        placeholder="Search for a book"
                        onChange={this.handleChange}
                    />
                    <button type="submit">
                        <i className="fa fa-search">Search</i>
                    </button>
                </form>
                {booksList.length > 0 ? (
                    booksList.map(book => (
                        <BookCard bookID={book} key={book} />
                    ))
                ) : (
                    <p>
                        Couldn't find any book. Please search again using
                        another search criteria.
                    </p>
                )}
            </div>
        );
    }
}

class BookCard extends React.Component {
    state = {
        bookData: {}
    };

    componentDidMount() {
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes/${this.props.bookID}?key=AIzaSyAmt5YReWJ39vXhNVGufgGKxkVfxHg0Z_A`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ bookData: res.volumeInfo });
            });
    }

    render() {
        const {
            title,
            infoLink,
            authors,
            publisher,
            imageLinks
        } = this.state.bookData;

        if (!imageLinks || imageLinks === 'N/A') { return null; }

        return (
            <div className="book-card-container">

                <div className="image-container">
                    <div
                        className="bg-image" style={{ backgroundImage: `url(${imageLinks.medium})` }}
                    />
                </div>
                <div className="book-info">
                    <h2>Book Details</h2>
                    <div>

                        <h1>{title}</h1>
                        <h4></h4>
                        <small>Authors: {authors}</small>
                    </div>
                    <h4>Published by: {publisher}</h4>
                    <a href={infoLink}>More info</a>

                </div>

            </div>
        )
    }
}
export default BooksList;
