import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import CopyToClipboard from 'react-copy-to-clipboard';
import stringToColor from '../../../modules/stringToColor';
import Quote from '../../Modules/Quote';
import Welcome from '../../Modules/Welcome';
import './styles.css';


class Home extends Component {

  state = {
    saturation: 50,
    lightnes: 20,
    appHistory: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"],
  }

  componentWillMount() {
    this.props.getQuotes();

    const quote_id = this.props.match.params.quote_id;
    if (!quote_id) {
      this.goToNextQuote();
    } else {
      this.setState({appHistory: [...this.state.appHistory, quote_id]})
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleShortcuts);

    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleShortcuts);
  }

  _notificationSystem = null;

  _getNotificationSystemInstance = () => {
    return this._notificationSystem
  }

  handleShortcuts = e => {
    switch(e.which) {
      case 13:
      case 32:
      case 39:
      case 40:
        e.preventDefault();
        this.goToNextQuote();
        break;
      default: break;
    }
  }

  getAvailableQuotes = () => {
    const { quotes } = this.props;

    return Object.keys(quotes).filter( item => {
      return this.state.appHistory.indexOf(item) === -1;
    })
  }

  getRandomQuote = () => {
    const variants = this.getAvailableQuotes();

    if (variants.length) {
      return variants[Math.floor(Math.random() * variants.length)];
    } else {
      return null
    }
  }

  goToNextQuote = e => {
    e && e.preventDefault();
    const { appHistory } = this.state;
    const nextQuoteId = this.getRandomQuote();

    if (this.getAvailableQuotes().length > 1) {
      this.setState({appHistory: [...appHistory, nextQuoteId]})
    } else {
      this.setState({appHistory: []})
    }
    this.props.history.push('/' + nextQuoteId);
  }

  goToPrevQuote = e => {
    e && e.preventDefault();
    this.props.history.goBack();
  }

  onCopySuccess = () => {
    this._notificationSystem.addNotification({
      title: 'Цитата успешно сохранена в буфер обмена',
      level: 'success',
      position: 'tr',
      autoDismiss: 5
    })
  }

  render() {
    const { saturation, lightnes } = this.state;
    const { quotes, quotes_loaded } = this.props;
    const requested_quote_id = this.props.match.params.quote_id;
    const currentQuote = quotes[requested_quote_id] || null;

    const getBgColor = () => {
      if (currentQuote) {
        return stringToColor(currentQuote.quote, 360, saturation, lightnes);
      }
      return '#333';
    }

    const notificationCustomStyles = {
      NotificationItem: { 
        DefaultStyle: { 
          fontFamily: 'PT Sans, Helvetica, Arials, sans-serif'
        }
      }
    }

    return (
      quotes_loaded ?
        <div className="home" style={{backgroundColor: getBgColor()}}>
          <div className="home__content">
            {
              currentQuote
                ? <Quote currentQuote={currentQuote} onCopySuccess={this.onCopySuccess} />
                : <Welcome goToNextQuote={this.goToNextQuote} />
            }
          </div>
          <div className="home__panel">
            <button 
              title="Предыдущая цитата"
              className="home__btn" 
              onClick={this.goToPrevQuote} 
              style={{background: getBgColor()}}>
              <i className="fa fa-angle-left" aria-hidden="true" />
            </button>
            <CopyToClipboard text={currentQuote.quote} onCopy={this.onCopySuccess}>
              <button 
                title="Сохранить цитату в буфер обмена"
                className="home__btn" 
                style={{background: getBgColor()}}>
                <i className="fa fa-floppy-o" aria-hidden="true"/>
              </button>
            </CopyToClipboard>
            <button 
              title="Следующая цитата"
              className="home__btn" 
              onClick={this.goToNextQuote} 
              style={{background: getBgColor()}}>
              <i className="fa fa-angle-right" aria-hidden="true" />
            </button>
          </div>
          <NotificationSystem ref="notificationSystem" style={notificationCustomStyles} />
        </div>
      : null
    )
  }
}

export default connect(
  state => ({
    quotes: state.quotes.quotes,
    quotes_loaded: state.quotes.quotes_loaded,
    appHistory: state.history,
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
      getData("http://localhost:8082/quotes", (payload) => {
        dispatch({type: 'SET_QUOTES', payload: JSON.parse(payload)});
      })
    },
    onAddHistory: payload => {
      dispatch({type: 'ADD_HISTORY_ITEM', payload})
    },
    setHistory: payload => {
      dispatch({type: 'SET_HISTORY', payload})
    }
  })
)(withRouter(Home));