import React, {Component} from "react";


// Redux Imports
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import WeaponStats from '../../weapons.json'

import { LayoutChange } from '../../rr_actions/rr_a_layoutChange';
import { WeaponChange } from '../../rr_actions/rr_a_weaponChange';
import { FireWeapon } from '../../rr_actions/rr_a_fireWeapon';
import { OptionChange } from '../../rr_actions/rr_a_optionChange';

class Foreground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      shot: 0,
      recoil: { x: 0, y: 0 }
    }
    this.fireHandler = this.fireHandler.bind(this);
    this.reload = this.reload.bind(this);
  }

  adsHandler(e) {
    e.preventDefault()
    console.log("ADS")
  }

  reload() {
    console.log("reloading")
    this.setState({
      shot: 0,
      recoil: { x: 0, y: 0 }
    })
  }

  handleKeyPress(e) {
    // console.log(e.keyCode)
    // console.log(e.key)
  }


  fireHandler(e) {
    let gun = WeaponStats[Object.keys(WeaponStats)[this.props.weapons.currentWeapon - 1]]
    // console.log(gun)

    if(e.type === 'mousedown') {
      console.log("FIRING!")
      let shot_per_sec = 1 / ( gun.damage_chest / gun.DPS )
      let fireRate = ( 1 / shot_per_sec ) * 1000

      if(this.state.shot === 0) {
        this.props.FireWeapon({
          log: {
            mousePos: {
              x: this.props.position.x,
              y: this.props.position.y,
            },
            recoil: {
              x: gun.spraySnake[0][0] - gun.spraySnake[this.state.shot][0],
              y: gun.spraySnake[0][1] - gun.spraySnake[this.state.shot][1]
            },
            dims: this.props.elementDimensions,
            weapon: Object.keys(WeaponStats)[this.props.weapons.currentWeapon - 1],
            shotNum: this.state.shot
          }, 
          target: this.props.targets.currentTarget,
          range: this.props.targets.range,
          moving: this.props.targets.moving
        })
  
        this.setState({ 
          time: Date.now(),
          shot: this.state.shot + 1,
          recoil: {
            x: gun.spraySnake[0][0] - gun.spraySnake[this.state.shot][0],
            y: gun.spraySnake[0][1] - gun.spraySnake[this.state.shot][1]
          }
        })
      }

      this.interval = setInterval(() => {
        console.log("boom")
        // console.log(Date.now() - this.state.time)
        // console.log(gun.magSize)
        // console.log(this.state.shot)

        if(this.state.shot >= gun.magSize) {
          // console.log("clip empty")
          clearInterval(this.interval);
          this.reload();
        } else {

          // console.log(gun.spraySnake[this.state.shot])
          let recoil_x = gun.spraySnake[0][0] - gun.spraySnake[this.state.shot][0]
          let recoil_y = gun.spraySnake[0][1] - gun.spraySnake[this.state.shot][1]
          let recoil = {
            x: recoil_x,
            y: recoil_y
          }
          // console.log(recoil)

          // console.log("current crosshair:")
          // console.log(this.props.elementDimensions)
          // console.log(this.props.position.x)
          // console.log(this.props.position.y)

          let log = {
            mousePos: {
              x: this.props.position.x,
              y: this.props.position.y,
            },
            recoil: recoil,
            dims: this.props.elementDimensions,
            weapon: Object.keys(WeaponStats)[this.props.weapons.currentWeapon - 1],
            shotNum: this.state.shot
          }

          this.props.FireWeapon({
            log: log, 
            recoil: recoil,
            target: this.props.targets.currentTarget,
            range: this.props.targets.range,
            moving: this.props.targets.moving
          })

          this.setState({ 
            time: Date.now(),
            shot: this.state.shot + 1,
            recoil
          })
        }

      }, fireRate);

    } else {
      console.log("STOPPED!")
      clearInterval(this.interval);
      this.setState({
        shot: 0,
        recoil: { x: 0, y: 0 }
      })
      this.reload();
      // trigger score calculation here
    }
  }

  render() {
    let weapon = Object.keys(WeaponStats)[this.props.weapons.currentWeapon - 1];
    let weaponImg = WeaponStats[weapon].imageADS;

    // console.log(this.props.weapons)
    // console.log(this.props)
    // console.log(WeaponStats[weapon])
    // console.log(this.state.time)

    let dimensions = this.props.elementDimensions

    let rest = { x: dimensions.width / 2, y: (dimensions.height / 4) * 3 }

    let position = this.props.isPositionOutside ? rest : { x: this.props.position.x, y: this.props.position.y }
    // let position = { x: this.props.position.x, y: this.props.position.y }

    let points = 0

    this.props.history.latest.map((shot, i) => {
      // console.log(shot.points, i)
      points = points + shot.points
      return ''
    })

    return (
      <div 
        className="Foreground" 
        onContextMenu={this.adsHandler}
        onMouseDown={this.fireHandler}
        onMouseUp={this.fireHandler}>

        <div id="foreground_score">
          <h2>SCORE: {points}</h2>
        </div>

        <div id="sprayMap" style={{
          transition: this.props.isPositionOutside ? '0.7s all' : 'none',
          left: position.x - 200,
          top: position.y - 475,
          opacity: this.props.options.o_snake ? 1 : 0
        }}>
          {WeaponStats[weapon].spraySnake.map((shot, i) => {
            return (
              <div key={i} className="snakePoint" style={{
                top: shot[1],
                left: shot[0] 
              }}></div>
            )
          })}
        </div>

        <div id="sprayGuide" style={{
          transition: this.props.isPositionOutside ? '0.7s all' : 'none',
          left: position.x - 200 + 2,
          top: position.y - 475 + 452,
          opacity: this.props.options.o_guide ? 1 : 0
        }}>
          {WeaponStats[weapon].spraySnake.map((shot, i) => {
            if(i >= this.state.shot) {
              // console.log(shot)
              return ( // [200, 475]
                <div key={i} className="guidePoint" style={{
                  top: shot[1] - WeaponStats[weapon].spraySnake[this.state.shot][1] + 474 + this.state.recoil.y,
                  left: shot[0] - WeaponStats[weapon].spraySnake[this.state.shot][0] + 199 + this.state.recoil.x
                }}></div>
              )
            } else {
              return ''
            }
          })}
        </div>

        <div id="reddot" style={{
            left: position.x - this.state.recoil.x - 1,
            top: position.y  - this.state.recoil.y - 1,
            opacity: this.props.options.o_reddot ? 0.9 : 0
          }}></div>

        <div id="equippedWeapon" style={{
          transition: this.props.isPositionOutside ? '0.9s all' : 'none',
          left: position.x - 400 - this.state.recoil.x,
          top: position.y - 98 - this.state.recoil.y,  // 800 × 400
          opacity: this.props.options.o_weapon ? 0 : this.props.options.o_opacity ? 0.5 : 1,
          filter: this.props.options.o_silhouette ? 'brightness(0%)' : 'brightness(100%)'
        }}>
          <img src={weaponImg} alt="weapon" />
        </div>


        <div id="belt">
          {Object.keys(WeaponStats).map((gun, key) => {
            return (
            <div key={key} className="beltSlot" style={{
              background: weaponImg === WeaponStats[gun].imageADS ? 'blue' : '#21212180',
            }}>
              <img src={WeaponStats[gun].imageInv} alt="gun" />
            </div>
            )
          })}
        </div>


        <div id="positionDebug"> {this.props.position.x}, {this.props.position.y} </div>

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
    targets: state.targets,
    options: state.options,
    history: state.history
  };
}

// these are the 'actions' that get bound to props function let
function mapDispatchToProps(dispatch) { // whenever <function below> is called result should be passed to all of our
  // reducers
  return bindActionCreators({
    LayoutChange: LayoutChange,
    WeaponChange: WeaponChange,
    FireWeapon: FireWeapon,
    OptionChange: OptionChange
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Foreground);
// export default App;