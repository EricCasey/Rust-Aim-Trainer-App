import React, {Component} from "react";

// React-Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// React-Redux Actions
import {LayoutChange} from '../rr_actions/rr_a_layoutChange';

import WeaponStats from '../weapons.json'

class Right extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: 's_session'
    }
    this.statSelect = this.statSelect.bind(this);
  }

  statSelect(e) { this.setState({ stats: e.target.id }) }

  render() {
    let lay = this.props.layout;
    let weapon = Object.keys(WeaponStats)[this.props.weapons.currentWeapon - 1]
    let hits = 0
    let miss = 0
    let head = 0
    let points = 0
    let hit_head = 0
    let hit_chest = 0
    let hit_arms = 0
    let hit_legs = 0

    this.props.history.latest.map((key, i) => {
      if(key.hit) {
        hits += 1
        points += key.points
        if(key.type === 'head' || key.type === 'bullseye') {
          head += 1
          hit_head += 1
        }
        if(key.type === 'legs') {
          hit_legs += 1
        }
        if(key.type === 'arms') {
          hit_arms += 1
        }
        if(key.type === 'chest') {
          hit_chest += 1
        }
      } else {
        miss += 1
      }
      return ''
    })

    console.log(this.props.history.latest)
    console.log(this.props.weapons)


    // let analysisOverlay = ''
    // if(this.props.targets.currentTarget === 'target_player') {
    //   analysisOverlay = (
    //     <div id="analysisOverlay">
    //       <p style={{ left: 105, top: 30 }}>{hit_head}</p>
    //       <p style={{ left: 105, top: 80 }}>{hit_chest}</p>
    //       <p style={{ left: 130, top: 70 }}>{hit_arms}</p>
    //       <p style={{ left: 105, top: 150 }}>{hit_legs}</p>
    //       <p style={{ left: 50, top: 70 }}>{miss}</p>
    //     </div>
    //   )
    // } else if (this.props.targets.currentTarget === 'target_archery') {
    //   analysisOverlay = ''
    //   // analysisOverlay = (
    //   //   <div id="analysisOverlay">
    //   //     archery
    //   //   </div>
    //   // )
    // } else {
    //   analysisOverlay = ''
    //   // analysisOverlay = (
    //   //   <div id="analysisOverlay">
    //   //     darts
    //   //   </div>
    //   // )
    // }

    return (
      <div
        className="Right"
        style={{
        width: lay.right
          ? '300px'
          : '36px',
        height: lay.foot
          ? 'calc(100% - 300px)'
          : 'calc(100% - 36px)'
      }}>
        <div id="hoverBox-Right" onClick={this.props.LayoutChange}>{`<`}</div>
        <h2
          style={{
          transform: lay.right ? 'rotate(0deg)' : 'rotate(270deg)',
          margin: lay.right ? '0 0 0 0' : '110px 0 0 -40px',
          width: lay.right ? '300px' : '600px',
          height: lay.right ? '35px' : '50px'
        }}>STATISTICS</h2>

        <div
          id="rightList"
          style={{ opacity: lay.right ? 1 : 0 }}>

            <div id="statSelect">
              <h3 id="s_latest" style={{ borderBottom: this.state.stats === 's_latest' ? '2px solid white' : 'none' }} onClick={this.statSelect}>Latest Spray</h3>
              <h3 id="s_session" style={{ borderBottom: this.state.stats === 's_session' ? '2px solid white' : 'none' }} onClick={this.statSelect}>Session Stats</h3>
            </div>

            <div id="statCont">

              {this.state.stats === 's_latest' ? (
              <div id="statSubCont">

                <div>
                  <p></p>
                  <p>#</p>  
                  <p>%</p>
                </div>

                <div>
                  <p>Shots Fired:</p>
                  <p>{ this.props.history.latest.length }</p>
                  <p>{ Math.round( ( this.props.history.latest.length / WeaponStats[weapon].magSize ) * 100 ) + '%' }</p>
                </div>

                <div>
                  <p>Hits:</p>
                  <p>{ hits }</p>
                  <p>{ Math.round( ( hits / this.props.history.latest.length ) * 100 ) + '%' }</p>
                </div>

                <div>
                  <p>{ this.props.targets.currentTarget === 'target_player' ? 'Headshots:' : 'Bullseyes:' }</p>
                  <p>{ head }</p>
                  <p>{ Math.round( ( head / this.props.history.latest.length ) * 100 ) + '%' }</p>
                </div>

                <div>
                  <p>{ this.props.targets.currentTarget === 'target_player' ? 'Damage:' : 'Points:' }</p>
                  <p>{ points }</p>
                  <p>{ Math.round( ( head / this.props.history.latest.length ) * 100 ) + '%' }</p>
                </div>

                <div id="sprayTrack">

                  <div id="sprayTrack_hit">
                    {this.props.history.latest.map((key, i) => {
                      return (
                        <div key={i} style={{
                          border: '1px solid red',
                          height: '4px',
                          width: '4px',
                          margin: 'auto',
                          borderColor: key.hit ? 'lightgreen' : 'red'
                        }}></div>
                      )
                    })}
                  </div>

                  <div id="sprayTrack_mag">
                    <div style={{
                      background: 'white',
                      width: `${( this.props.history.latest.length / WeaponStats[weapon].magSize ) * 100}%`,
                      transition: '0.2s all',
                      marginLeft: 0
                    }}></div>
                  </div>

                </div>

                {/* <div id="targetAnalysis">

                  <div id="analysisTarget">
                    <img alt='target' src={this.props.targets.currentTarget === 'target_player' ? 'https://i.imgur.com/QUC1LRp.png' : this.props.targets.currentTarget === 'target_archery' ? 'http://www.clipartbest.com/cliparts/jix/pAB/jixpABk7T.png' : 'https://i.imgur.com/l1gmoFL.png' } />
                  </div>

                  {analysisOverlay}

                </div> */}

              </div>
              ) : ( // session stats
              <div id="statSubCont">

                <div>
                  <p></p>
                  <p>#</p>
                  <p>%</p>
                </div>

                <div>
                  <p>Shots Fired:</p>
                  <p>{ 0 }</p>
                  <p>{  '%' }</p>
                </div>

                <div>
                  <p>Hits:</p>
                  <p>{ 0 }</p>
                  <p>{  '%' }</p>
                </div>

                {/* <div>
                  <p>{ this.props.targets.currentTarget === 'target_player' ? 'Headshots:' : 'Bullseyes:' }</p>
                  <p>{ head }</p>
                  <p>{ Math.round( ( head / this.props.history.latest.length ) * 100 ) + '%' }</p>
                </div>

                <div>
                  <p>{ this.props.targets.currentTarget === 'target_player' ? 'Damage:' : 'Points:' }</p>
                  <p>{ points }</p>
                  <p>{ Math.round( ( head / this.props.history.latest.length ) * 100 ) + '%' }</p>
                </div> */}

                <div>
                  weapons
                </div>

                <div>
                  range
                </div>

              </div>
                )}
            </div>


        </div>

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
    history: state.history,
    weapons: state.weapons,
    targets: state.targets
  };
}

// these are the 'actions' that get bound to props
function mapDispatchToProps(dispatch) {
  // whenever <function below> is called result should be passed to all of our
  // reducers
  return bindActionCreators({
    LayoutChange: LayoutChange
  }, dispatch);
}

// to promote monoSwitch from component to container it needs to know about
// these things

export default connect(mapStateToProps, mapDispatchToProps)(Right);
// export default App;