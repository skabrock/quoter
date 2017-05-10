import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../../Modules/List';
// import Notification from '../../Modules/Notification';
// import Quote from '../../Modules/Quote';
import './styles.css';
// import './styles.css';

class Home extends Component {

  state = {
    bg_color: '#fff',
    saturation: 50,
    lightnes: 20,
    // quotation: 'quotation',
    // author: 'author',
    // notification: 'notification'
  }

  render() {
    const { bg_color } = this.state;
    return (
      <div className="home" style={{backgroundColor: bg_color}}>
        <List />
      </div>
    )
  }
}

export default connect(
  state => ({
    quotes: state.quotes,
    history: state.history,
  }),
  null
)(Home);