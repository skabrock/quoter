import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './styles.css';

export default class Quote extends Component {
  render() {
    const { currentQuote, onCopySuccess } = this.props;
    return (
      <div className="quote">
        <h1 className="quote__sentence">
          "{currentQuote.quote}"
          <CopyToClipboard className="quote__save-btn" text={currentQuote.quote} onCopy={onCopySuccess}>
            <button>
              <i className="fa fa-floppy-o" aria-hidden="true"/>
            </button>
          </CopyToClipboard>
        </h1>
        <p className="quote__author">
          <i className="fa fa-user-o" aria-hidden="true"/> {currentQuote.author}
        </p>
      </div>
    )
  }
}
