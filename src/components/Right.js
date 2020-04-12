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
      stats: 's_latest'
    }
    this.statSelect = this.statSelect.bind(this);
  }

  statSelect(e) { this.setState({ stats: e.target.id }) }

  render() {
    let lay = this.props.layout;
    let weapon = Object.keys(WeaponStats)[this.props.weapons.currentWeapon - 1]
    let hits = 0
    // let miss = 0
    let head = 0
    let points = 0
    // let hit_head = 0
    // let hit_chest = 0
    // let hit_arms = 0
    // let hit_legs = 0

    this.props.history.latest.map((key, i) => {
      if(key.hit) {
        hits += 1
        points += key.points
        if(key.type === 'head' || key.type === 'bullseye') {
          head += 1
          // hit_head += 1
        }
        if(key.type === 'legs') {
          // hit_legs += 1
        }
        if(key.type === 'arms') {
          // hit_arms += 1
        }
        if(key.type === 'chest') {
          // hit_chest += 1
        }
      } else {
        // miss += 1
      }
      return ''
    })

    let maxScore = this.props.targets.currentTarget === 'target_player' 
      ? WeaponStats[weapon].damage_head * WeaponStats[weapon].magSize 
      : this.props.targets.currentTarget === 'target_darts' 
        ? WeaponStats[weapon].magSize * 60
        : WeaponStats[weapon].magSize * 10

    // console.log(this.props.history)
    // console.log(this.props.weapons)
    // console.log(WeaponStats[weapon])

    // console.log("max possible score")
    // console.log(WeaponStats[weapon].magSize)
    // console.log(WeaponStats[weapon].damage_head)
    // console.log(maxScore)

    // console.log(this.props.history.overall)

    // dims: {width: 750, height: 646}
    // hit: true
    // mousePos: {x: 359, y: 409}
    // points: 35
    // recoil: {x: 0, y: 0}
    // shotNum: 0
    // topLeft: {x: 200, y: 148, size: 350, center: {…}}
    // type: "legs"
    // weapon: "AK47"

    let o_hits = 0
    let o_shots = 0
    let o_points = 0
    let o_crit = 0
    let o_maxPoints = 0

    let rangeObj = {
      lo: { hits: 0, shots: 0, crit: 0 },
      mi: { hits: 0, shots: 0, crit: 0 },
      hi: { hits: 0, shots: 0, crit: 0 },
    }

    let targetObj = {
      target_archery: { hits: 0, shots: 0, crit: 0 },
      target_darts: { hits: 0, shots: 0, crit: 0 },
      target_player: { hits: 0, shots: 0, crit: 0 },
    }

    let weaponList = []

    let weaponObj = {
      AK47: { hits: 0, shots: 0, crit: 0, spray_shot: {}, spray_hit: {} },
      LR300: { hits: 0, shots: 0, crit: 0, spray_shot: {}, spray_hit: {} },
      CustomSMG: { hits: 0, shots: 0, crit: 0, spray_shot: {}, spray_hit: {} },
      Thompson: { hits: 0, shots: 0, crit: 0, spray_shot: {}, spray_hit: {} },
      MP5A4: { hits: 0, shots: 0, crit: 0, spray_shot: {}, spray_hit: {} },
      M249: { hits: 0, shots: 0, crit: 0, spray_shot: {}, spray_hit: {} }
    }

    Object.keys(this.props.history.overall).map((range, i) => {
      let hist = this.props.history.overall[range]

      // console.log(range)
      // console.log(hist)
      hist.map((shot, i) => {
        // console.log(shot)

        if(!weaponObj[shot.weapon].spray_shot[shot.shotNum]) {
          // console.log("shotnum not added!!!")
          weaponObj[shot.weapon].spray_shot[shot.shotNum] = 0
          weaponObj[shot.weapon].spray_hit[shot.shotNum] = 0

          weaponObj[shot.weapon].spray_shot[shot.shotNum] = weaponObj[shot.weapon].spray_shot[shot.shotNum] + 1

          if(shot.hit) {
            weaponObj[shot.weapon].spray_hit[shot.shotNum] = weaponObj[shot.weapon].spray_hit[shot.shotNum] + 1
          }
        } else {
          // console.log('shotnum is added already!')
          weaponObj[shot.weapon].spray_shot[shot.shotNum] = weaponObj[shot.weapon].spray_shot[shot.shotNum] + 1
          if(shot.hit) {
            weaponObj[shot.weapon].spray_hit[shot.shotNum] = weaponObj[shot.weapon].spray_hit[shot.shotNum] + 1
          }
        }
        

        if(weaponList.indexOf(shot.weapon) === -1) weaponList.push(shot.weapon)

        o_shots += 1
        rangeObj[range].shots = rangeObj[range].shots + 1
        targetObj[shot.target].shots = targetObj[shot.target].shots + 1
        weaponObj[shot.weapon].shots = weaponObj[shot.weapon].shots + 1

        o_points += shot.points

        if(shot.hit) {
          o_hits += 1
          rangeObj[range].hits = rangeObj[range].hits + 1
          targetObj[shot.target].hits = targetObj[shot.target].hits + 1
          weaponObj[shot.weapon].hits = weaponObj[shot.weapon].hits + 1
        }
        if(shot.type === 'head' || shot.type === 'bullseye') {
          o_crit += 1
          rangeObj[range].crit = rangeObj[range].crit + 1
          targetObj[shot.target].crit = targetObj[shot.target].crit + 1
          weaponObj[shot.weapon].crit = weaponObj[shot.weapon].crit + 1
        }
        if(shot.shotNum === 0) o_maxPoints += shot.maxScore

        return ''
      })
      return ''
    })

    // console.log(rangeObj, targetObj, weaponObj, weaponList)


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
        width: lay.right ? '300px' : '36px',
        height: lay.foot ? 'calc(100% - 300px)' : 'calc(100% - 36px)'
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

                <h3>Summary</h3>

                <div className="three_wide">
                  <p></p>
                  <p>#</p>  
                  <p>%</p>
                </div>

                <div className="three_wide">
                  <p>Shots Fired:</p>
                  <p>{ this.props.history.latest.length }</p>
                  <p>{ Math.round( ( this.props.history.latest.length / WeaponStats[weapon].magSize ) * 100 ) + '%' }</p>
                </div>

                <div className="three_wide">
                  <p>Hits:</p>
                  <p>{ hits === 0 ? '-' : hits }</p>
                  <p>{ isNaN(Math.round( ( hits / this.props.history.latest.length ) * 100 )) ? '-' : Math.round( ( hits / this.props.history.latest.length ) * 100 ) + '%' }</p>
                </div>

                <div className="three_wide">
                  <p>{ this.props.targets.currentTarget === 'target_player' ? 'Headshots:' : 'Bullseyes:' }</p>
                  <p>{ head === 0 ? '-' : head }</p>
                  <p>{ isNaN(Math.round( ( head / this.props.history.latest.length ) * 100 )) ? '-' : Math.round( ( head / this.props.history.latest.length ) * 100 ) + '%' }</p>
                </div>

                <div className="three_wide">
                  <p>{ this.props.targets.currentTarget === 'target_player' ? 'Damage:' : 'Points:' }</p>
                  <p>{ points === 0 ? '-' : points }</p>
                  <p>{ isNaN(Math.round( ( points / maxScore ) * 100 )) ? '-' : Math.round( ( points / maxScore ) * 100 ) + '%' }</p>
                </div>

                <h3>Spray Track</h3>

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

                  <h3>Ammo Usage</h3>

                  <div id="sprayTrack_mag">
                    <div style={{
                      background: 'white',
                      width: `${( this.props.history.latest.length / WeaponStats[weapon].magSize ) * 100}%`,
                      transition: '0.2s all',
                      marginLeft: 0,
                      opacity: '0.9'
                    }}></div>
                  </div>

                  {/* <h3>Difficulty Setting</h3>

                  <div className="three_wide">
                    <p>{this.props.options.o_fireRate}</p>
                    <p>{this.props.options.o_randomness}</p>
                    <p>{this.props.targets.range}</p>
                  </div> */}


                  <h3>This Weapon</h3>

                  <div id="currentWeaponStats">
                    <div className="gunStat">
                      <h5>{weapon}</h5>

                      <div className="gunStat_half">
                        <h6>Accuracy</h6>
                        <p>{ isNaN( Math.round( weaponObj[weapon].hits / weaponObj[weapon].shots ) ) ? '-' : Math.round( ( weaponObj[weapon].hits / weaponObj[weapon].shots) * 100 ) + '%' }</p>
                      </div>

                      <div className="gunStat_half">
                        <h6>Crit %</h6>
                        <p>{ isNaN( Math.round( weaponObj[weapon].crit / weaponObj[weapon].shots ) ) ? '-' : Math.round( ( weaponObj[weapon].crit / weaponObj[weapon].shots) * 100 ) + '%' }</p>
                      </div>
                      <div className="gunStat_bar">
                        <div className="gunStat_barA">
                        {[...Array(WeaponStats[weapon].magSize).keys()].map((shot, i) => {

                          let shotList = Object.keys(weaponObj[weapon].spray_hit)

                          let acc = 0
                          if(shotList.indexOf(String(shot)) !== -1) {
                            acc = ( weaponObj[weapon].spray_hit[String(shot)] / weaponObj[weapon].spray_shot[String(shot)] ) * 100
                          } 
                          
                          return (
                            <div 
                              key={i}
                              className="shot_bar"
                              style={{
                                width: `calc(100% / ${WeaponStats[weapon].magSize})`
                              }}>
                              <div 
                                className='shot_bar_bar'
                                style={{ 
                                  height: `${ acc }%`,
                                  background: `rgb(${255 - (255 * (acc / 100))},${255 * (acc / 100)},0)`  }}>
                              </div>
                            </div>
                          )
                        })}
                        </div>
                        <div className="gunStat_barB">
                          <p>1</p>
                          <div></div>
                          <p>{ Math.round(WeaponStats[weapon].magSize / 2)}</p>
                          <div></div>
                          <p>{WeaponStats[weapon].magSize}</p>
                        </div>
                      </div>
                    </div>
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

                <h3>Summary</h3>

                <div className="three_wide">
                  <p></p>
                  <p>#</p>
                  <p>%</p>
                </div>

                <div className="three_wide">
                  <p>Hits:</p>
                  <p>{ o_hits === 0 ? '-' : o_hits }</p>
                  <p>{ isNaN(Math.round( ( o_hits / o_shots ) * 100 )) ? '-' : Math.round( ( o_hits / o_shots ) * 100 ) + '%' }</p>
                </div>

                <div className="three_wide">
                  <p>Critical:</p>
                  <p>{ o_crit === 0 ? '-' : o_crit }</p>
                  <p>{ isNaN(Math.round( ( o_crit / o_shots ) * 100 )) ? '-' : Math.round( ( o_crit / o_shots ) * 100 ) + '%' }</p>
                </div>

                <div className="three_wide">
                  <p>Points:</p>
                  <p>{ o_points === 0 ? '-' : o_points }</p>
                  <p>{ isNaN(Math.round( ( o_points / o_maxPoints ) )) ? '-' : Math.round( ( o_points / o_maxPoints ) ) + '%' }</p>
                </div>

                <h3>Range</h3>

                <div className="four_wide">
                  <p></p>
                  <p>Close</p>
                  <p>Mid</p>
                  <p>Long</p>
                </div>

                <div className="four_wide">
                  <p>Accuracy</p>
                  <p>{ isNaN(Math.round( (rangeObj['lo'].hits / rangeObj['lo'].shots) * 100 )) ? '-' : Math.round( (rangeObj['lo'].hits / rangeObj['lo'].shots) * 100 ) + '%' }</p>
                  <p>{ isNaN(Math.round( (rangeObj['mi'].hits / rangeObj['mi'].shots) * 100 )) ? '-' : Math.round( (rangeObj['mi'].hits / rangeObj['mi'].shots) * 100 ) + '%' }</p>
                  <p>{ isNaN(Math.round( (rangeObj['hi'].hits / rangeObj['hi'].shots) * 100 )) ? '-' : Math.round( (rangeObj['hi'].hits / rangeObj['hi'].shots) * 100 ) + '%' }</p>
                </div>

                <div className="four_wide">
                  <p>Crit %</p>
                  <p>{ isNaN(Math.round( (rangeObj['lo'].crit / rangeObj['lo'].shots) * 100 )) ? '-' : Math.round( (rangeObj['lo'].crit / rangeObj['lo'].shots) * 100 ) + '%' }</p>
                  <p>{ isNaN(Math.round( (rangeObj['mi'].crit / rangeObj['mi'].shots) * 100 )) ? '-' : Math.round( (rangeObj['mi'].crit / rangeObj['mi'].shots) * 100 ) + '%' }</p>
                  <p>{ isNaN(Math.round( (rangeObj['hi'].crit / rangeObj['hi'].shots) * 100 )) ? '-' : Math.round( (rangeObj['hi'].crit / rangeObj['hi'].shots) * 100 ) + '%' }</p>
                </div>

                <h3>Targets</h3>

                <div className="four_wide centered">
                  <p></p>
                  <p>Archery</p>
                  <p>Darts</p>
                  <p>Player</p>
                </div>

                <div className="four_wide centered">
                  <p>Accuracy</p>
                  <p>{ isNaN(Math.round( ( targetObj['target_archery'].hits / targetObj['target_archery'].shots ) * 100 )) ? '-' : Math.round( ( targetObj['target_archery'].hits / targetObj['target_archery'].shots ) * 100 ) + '%' }</p>
                  <p>{ isNaN(Math.round( ( targetObj['target_darts'].hits / targetObj['target_darts'].shots ) * 100 )) ? '-' : Math.round( ( targetObj['target_darts'].hits / targetObj['target_darts'].shots ) * 100 ) + '%' }</p>
                  <p>{ isNaN(Math.round( ( targetObj['target_player'].hits / targetObj['target_player'].shots ) * 100 )) ? '-' : Math.round( ( targetObj['target_player'].hits / targetObj['target_player'].shots ) * 100 ) + '%' }</p>
                </div>

                <div className="four_wide centered">
                  <p>Crit %</p>
                  <p>{ isNaN(Math.round( ( targetObj['target_archery'].crit / targetObj['target_archery'].shots ) * 100 )) ? '-' : Math.round( ( targetObj['target_archery'].crit / targetObj['target_archery'].shots ) * 100 ) + '%' }</p>
                  <p>{ isNaN(Math.round( ( targetObj['target_darts'].crit / targetObj['target_darts'].shots ) * 100 )) ? '-' : Math.round( ( targetObj['target_darts'].crit / targetObj['target_darts'].shots ) * 100 ) + '%' }</p>
                  <p>{ isNaN(Math.round( ( targetObj['target_player'].crit / targetObj['target_player'].shots ) * 100 )) ? '-' : Math.round( ( targetObj['target_player'].crit / targetObj['target_player'].shots ) * 100 ) + '%' }</p>
                </div>

                <h3>Weapons</h3>

                <div id="weaponStatCont">
                  {weaponList.map((key, i) => {
                    return (
                      <div key={i} className="gunStat">
                        <h5>{key}</h5>

                        <div className="gunStat_half">
                          <h6>Accuracy</h6>
                          <p>{ isNaN( Math.round( weaponObj[key].hits / weaponObj[key].shots ) ) ? '-' : Math.round( ( weaponObj[key].hits / weaponObj[key].shots) * 100 ) + '%' }</p>
                        </div>

                        <div className="gunStat_half">
                          <h6>Crit %</h6>
                          <p>{ isNaN( Math.round( weaponObj[key].crit / weaponObj[key].shots ) ) ? '-' : Math.round( ( weaponObj[key].crit / weaponObj[key].shots) * 100 ) + '%' }</p>
                        </div>
                        <div className="gunStat_bar">
                          <div className="gunStat_barA">
                          {[...Array(WeaponStats[key].magSize).keys()].map((shot, i) => {

                            let shotList = Object.keys(weaponObj[key].spray_hit)

                            let acc = 0
                            if(shotList.indexOf(String(shot)) !== -1) {
                              acc = ( weaponObj[key].spray_hit[String(shot)] / weaponObj[key].spray_shot[String(shot)] ) * 100
                            } 
                            
                            return (
                              <div 
                                key={i}
                                className="shot_bar"
                                style={{
                                  width: `calc(100% / ${WeaponStats[key].magSize})`
                                }}>
                                <div 
                                  className='shot_bar_bar'
                                  style={{ 
                                    height: `${ acc }%`,
                                    background: `rgb(${255 - (255 * (acc / 100))},${255 * (acc / 100)},0)`  }}>
                                </div>
                              </div>
                            )
                          })}
                          </div>
                          <div className="gunStat_barB">
                            <p>1</p>
                            <div></div>
                            <p>{ Math.round(WeaponStats[key].magSize / 2)}</p>
                            <div></div>
                            <p>{WeaponStats[key].magSize}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
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
    targets: state.targets,
    options: state.options
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