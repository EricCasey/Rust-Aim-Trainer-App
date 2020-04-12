import React, {Component} from "react";

// React-Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// React-Redux Actions
import {LayoutChange} from '../rr_actions/rr_a_layoutChange';
import {ThemeChange} from '../rr_actions/rr_a_themeChange';

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let lay = this.props.layout;
    return (
      <div
        className="Head"
        style={{
        height: this.props.layout.head
          ? '300px'
          : '36px',
        width: lay.right
          ? 'calc(100% - 300px)'
          : 'calc(100% - 38px)'
      }}>

        <img
          src={require('../img/Sleipnir.png')}
          alt="horse"
          id="hoverBox-Head"
          // onClick={this.props.LayoutChange}
          />

        <div
          id="header_bar"
          style={{
          width: this.props.layout.head
            ? 'calc(100% - 40px)'
            : 'calc(100% - 40px)',
          fontSize: this.props.layout.head
            ? '28px'
            : '26px'
        }}>
          <h5>RUST . RECOIL . MONSTER</h5>
          <div id="head_logo">
            <a href="https://casey.works/?utm_source=recoil_monster" target="_blank" rel="noopener noreferrer">
              <p>By:</p>
              {/* https://i.imgur.com/qG7Bo8s.png */}
              {/* https://i.imgur.com/zs6OFcv.png */}
              <img src="https://i.imgur.com/zs6OFcv.png" alt="logo"/>
            </a>
          </div>
        </div>


        

        <div
          id="tricksCont"
          style={{
          opacity: this.props.layout.head
            ? 1
            : 0
        }}>

          <div className="trick">
            <h6>0.trickpony.tools</h6>
            <p>THIS BOILERPLATE</p>
          </div>

          <div className="trick">
            <h6>1.trickpony.tools</h6>
            <p>PASTE TRADER, ICEBERG, OTHER</p>
          </div>

          <div className="trick">
            <h6>2.trickpony.tools</h6>
            <p>BTC Puzzle Decoder</p>
          </div>

          <div className="trick">
            <h6>3.trickpony.tools</h6>
            <p>TPB 201 trailers</p>
          </div>

          <div className="trick">
            <h6>4.trickpony.tools</h6>
            <p>Fortnite Tracker</p>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {theme: state.theme, layout: state.layout};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    LayoutChange: LayoutChange,
    ThemeChange: ThemeChange
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Head);
