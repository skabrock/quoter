import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../Home';

class HomeWrapper extends Component {
  componentDidMount() {
    this.props.getQuotes();
  }

  render() {
    return(
      <div>
        {
          this.props.quotes_loaded
            ? <Home />
            : null
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    quotes_loaded: state.quotes.quotes_loaded,
  }), 
  dispatch => ({
    getQuotes: () => {
      const getData = (url, callback) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
      }
      getData("http://207.154.196.184:8082/quotes", (payload) => {
        dispatch({type: 'SET_QUOTES', payload: JSON.parse(payload)});
      })
    },
  })
)(HomeWrapper);