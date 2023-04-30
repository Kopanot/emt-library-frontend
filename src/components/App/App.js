import './App.css'
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import LibraryService from "../../repository/libraryRepository";
import Header from "../Header/header";
import Countries from "../Countries/countries";
import Authors from "../Authors/authors";
import Books from "../BookList/books";
import BookAdd from "../BookAdd/bookAdd";
import BookEdit from "../BookEdit/bookEdit";
import BooksTerm from "../BookTerm/booksTerm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      authors: [],
      books: [],
      selectedBook: {}
    }
  }

  render() {
    return (
        <Router>
          <Header/>
          <main>
            <div class="container">
              <Route path={"/authors"} exact render={() =>
                  <Authors authors={this.state.authors}/>}/>
              <Route path={"/countries"} exact render={() =>
                  <Countries countries={this.state.countries}/>}/>
              <Route path={"/books/add"} exact render={() =>
                  <BookAdd authors={this.state.authors}
                           onAddBook={this.addBook}/>}/>
              <Route path={"/books/edit/:id"} exact render={() =>
                  <BookEdit authors={this.state.authors}
                            onEditBook={this.editBook}
                            book={this.state.selectedBook}/>}/>
              <Route path={"/books"} exact render={() =>
                  <Books books={this.state.books}
                         onDelete={this.deleteBook}
                         onEdit={this.getBook}/>}/>
            </div>
          </main>
        </Router>

    )
  }

  componentDidMount() {
    this.loadCountries();
    this.loadAuthors();
    this.loadBooks();

  }

  loadCountries = () => {
    LibraryService.fetchCountries()
        .then((data) => {
          this.setState({
            countries: data.data
          })
        })
  }

  loadAuthors = () => {
    LibraryService.fetchAuthors()
        .then((data) => {
          this.setState({
            authors: data.data
          })
        })
  }

  loadBooks = () => {
    LibraryService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        })
  }

  deleteBook = (id) => {
    LibraryService.deleteBook(id)
        .then(() => {
          this.loadBooks();
        })
  }

  addBook = (name, category, author, availableCopies) => {
    LibraryService.addBook(name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        })
  }

  getBook = (id) => {
    LibraryService.getBook(id)
        .then((data) => {
          this.setState({
            selectedBook: data.data
          })
        })
  }

  editBook = (id, name, category, author, availableCopies) => {
    LibraryService.editBook(id, name, category, author, availableCopies)
        .then(() => this.loadBooks())
  }
}

export default App;
