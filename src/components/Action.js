import React, { Component } from "react";

import Foreground from './modules/Foreground.js';
import Background from './modules/Background.js';

import ReactCursorPosition from 'react-cursor-position';

// Redux Imports
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LayoutChange } from '../rr_actions/rr_a_layoutChange';
import { WeaponChange } from '../rr_actions/rr_a_weaponChange';
import { FireWeapon } from '../rr_actions/rr_a_fireWeapon';

class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let lay = this.props.layout;
    return (
      <div className="Action" style={{
        left: lay.left ? '300px' : '38px',
        width: lay.left ? 'calc(100% - 338px)' : lay.right ? 'calc(100% - 338px)' : 'calc(100% - 76px)',
        height: lay.foot ? 'calc(100% - 338px)' : 'calc(100% - 74px)',
        top: lay.head ? '300px' : '38px'
      }}>
        <ReactCursorPosition className="cursorOverlay">
          <Foreground layout={this.props.layout}/>
          <Background layout={this.props.layout}/>
        </ReactCursorPosition>
      </div>
    );
  }
}

// this is the 'data' that gets bound to props
function mapStateToProps(state) {
  // whatever gets returned will show up as props inside of dispatch fun
  return {
    theme: state.theme,
    layout: state.layout,
    weapons: state.weapons,
    options: state.options
  };
}

// these are the 'actions' that get bound to props
function mapDispatchToProps(dispatch) {
//   // whenever <function below> is called result should be passed
//   // to all of our reducers
  return bindActionCreators({
    LayoutChange: LayoutChange,
    WeaponChange: WeaponChange,
    FireWeapon: FireWeapon
  }, dispatch);
}

// to promote monoSwitch from component to container it needs
// to know about these things

export default connect(mapStateToProps, mapDispatchToProps)(Action);
// export default Action;