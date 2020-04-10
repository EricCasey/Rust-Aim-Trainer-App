import React from 'react';
import './App.scss';

import Head from './components/Head.js';
import Right from './components/Right.js';
import Foot from './components/Foot.js';
import Left from './components/Left.js';
import Action from './components/Action.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
    };
    this.layoutChange = this.layoutChange.bind(this);
  };

  layoutChange = (e) => {
    console.log("Layout Change", e)
  }

  render() {
    return (
      <div className="App">
        <Head layoutChange={this.layoutChange} />
        <Right layoutChange={this.layoutChange} />
        <Foot layoutChange={this.layoutChange} />
        <Left layoutChange={this.layoutChange} />
        <Action layoutChange={this.layoutChange} />
      </div>
    );
  }

}

export default App;
