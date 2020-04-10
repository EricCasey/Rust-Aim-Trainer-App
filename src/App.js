import React, { Component } from "react";

// App Containers Clockwise
import Head from './components/Head.js';
import Right from './components/Right.js';
import Foot from './components/Foot.js';
import Left from './components/Left.js';
import Action from './components/Action.js';

// Redux Imports
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// React-Redux Actions
import { LayoutChange } from './rr_actions/rr_a_layoutChange';
import { ThemeChange } from './rr_actions/rr_a_themeChange';
import { WeaponChange } from './rr_actions/rr_a_weaponChange';
import { TargetChange } from './rr_actions/rr_a_targetChange';
import { OptionChange } from './rr_actions/rr_a_optionChange';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    // console.log(this.state.layout)
    return (
        <div className="App">
          <Head />
          <Left />
          <Right />
          <Foot />
          <Action />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.theme,
    layout: state.layout,
    weapons: state.weapons,
    targets: state.targets,
    options: state.options
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    LayoutChange: LayoutChange,
    ThemeChange: ThemeChange,
    WeaponChange: WeaponChange,
    TargetChange: TargetChange,
    OptionChange: OptionChange
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);