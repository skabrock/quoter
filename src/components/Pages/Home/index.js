import React, { Component } from 'react';
import { connect } from 'react-redux';
import stringToColor from '../../../modules/stringToColor';
import Quote from '../../Modules/Quote';
import './styles.css';

class Home extends Component {

  state = {
    saturation: 50,
    lightnes: 20,
  }

  render() {
    const { saturation, lightnes } = this.state;
    const { quotes } = this.props;
    const requested_quote_id = this.props.match.params.quote_id;
    const currentQuote = quotes[requested_quote_id] || null;

    const getBgColor = () => {
      if (currentQuote) {
        return stringToColor(currentQuote.body, 360, saturation, lightnes);
      }
      return '#333';
    }

    return (
      <div className="home" style={{backgroundColor: getBgColor()}}>
        {
          currentQuote
            ? <Quote currentQuote={currentQuote} />
            : "Нет такой цитаты"
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    quotes: state.quotes,
    history: state.history,
  }), null
)(Home);