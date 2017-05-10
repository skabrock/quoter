import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

class Notification extends Component {
  render() {
    console.log('this.props.notification', this.props.notification)
    return(
      <div className="notification">
        notificatoin
      </div>
    )
  }
}

export default connect(
  state => ({
    notification: state[0]
  }),
  displatch => ({})
)(Notification);