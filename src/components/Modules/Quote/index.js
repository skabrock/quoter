import React, { Component } from 'react';
// import { connect } from 'react-redux';
import './styles.css';

export default class Quote extends Component {
  render() {
    const { currentQuote } = this.props;
    return (
      <div className="quote">
        <p className="quote__sentence">
          "{currentQuote.body}"
        </p>
        <p className="quote__author">
          {currentQuote.author}
        </p>
      </div>
    )
  }
}

// export default connect(
//   state => ({
//     quotes: state.quotes
//   }), null
// )(Quote);