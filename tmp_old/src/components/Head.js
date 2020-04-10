import React from 'react';
import '../App.scss';

class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  render() {
    return (
      <div className="Head" onClick={this.props.layoutChange}>
        Head Area
      </div>
    );
  }

}

export default Head;
