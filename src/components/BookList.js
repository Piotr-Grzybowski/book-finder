import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import EmptyBookCard from './EmptyBookCard';

class BooksList extends React.Component {
    state = {
        booksList: [],
        searchTerm: ''
    };

    search = event => {
        event.preventDefault();
        this.setState({
          booksList: [],
        });
        if (!this.state.searchTerm) return;
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

                const booksList = res.items.map(book => {
                  return {id: book.id, ...book.volumeInfo};
                });

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
                    <button className="btn btn-secondary"type="submit">
                        <i>Search</i>
                    </button>
                </form>
                {booksList.length > 0 ? (
                    booksList.map(book => (
                        <BookCard key={book.id} {...book}/>
                    ))
                ) : (
                    <EmptyBookCard />
                )}
            </div>
        );
    }
}

export default BooksList;
