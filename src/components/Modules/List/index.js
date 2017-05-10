import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

class Notification extends Component {

  addQuote = () => {
    this.props.onAddQuote(this.quoteId.value, this.quoteBody.value, this.quoteAuthor.value);
    this.quoteId.value = '';
    this.quoteBody.value = '';
    this.quoteAuthor.value = '';
  }

  render() {
    const { quotes } = this.props;
    return(
      <div>
        <input type="text" ref={ input => this.quoteId = input} placeholder="id" />
        <input type="text" ref={ input => this.quoteBody = input} placeholder="quote" /> 
        <input type="text" ref={ input => this.quoteAuthor = input} placeholder="author" />
        <button onClick={this.addQuote}>Save</button>
        <ul className="list">
          {
            quotes.map( item => 
              <li key={item.id}>{item.id} / {item.quote} / {item.author}</li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    quotes: state.quotes
  }),
  dispatch => ({
    onAddQuote: (id, body, author) => {
      dispatch({
        type: 'ADD_QUOTE',
        id,
        body,
        author
      })
    }
  })
)(Notification);