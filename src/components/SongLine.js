import React, { Component } from 'react';
// import Alert from 'reactstrap/src/Alert.js';

class SongLine extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return <h1>hello</h1>
    // return <Alert isOpen={this.state.isOpen} toggle={this.toggle} {...this.props} />;
  }
}

export default SongLine;
