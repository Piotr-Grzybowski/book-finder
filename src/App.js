import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class BooksList extends React.Component {
    state = {
        booksList: ['zyTCAlFPjgYC'],
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
                        <i className="fa fa-search" />
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
            authors,
            publisher,
            imageLinks
        } = this.state.bookData;


        return (
            <div className="book-card-container">
              <h4>Początek</h4>
                <div className="image-container">
                    <div
                        className="bg-image"
                    />
                </div>
                <div className="book-info">
                    <h2>Book Details</h2>
                    <div>
                        <h1>{title}</h1>
                        {console.log(this.state.bookData)}
                        <small>Authors: {authors}</small>
                    </div>
                    <h4>Published by: {publisher}</h4>

                </div>
              <h4>koniec</h4>
            </div>
        )
    }
}
export default BooksList;
