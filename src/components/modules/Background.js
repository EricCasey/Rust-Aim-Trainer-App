import React, { Component } from "react";

// Redux Imports
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';


class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let backgroundName = this.props.targets.currentTarget
    let background = ''
    let range = this.props.targets.range
    let target_size = range === 'lo' ? 350 : range === 'mi' ? 150 : 50
    // console.log(backgroundName)
    // console.log(this.props.history.latest)


    if(backgroundName === 'target_archery') {
      background = (
        <div className="bgImg bg_archery">

          <img 
            src="http://www.clipartbest.com/cliparts/jix/pAB/jixpABk7T.png" 
            alt="target"
            style={{
              height: target_size,
              width: target_size,
              transition: '0.7s all',
              opacity: this.props.options.o_target_hidden ? 0 : this.props.options.o_target_opacity ? 0.5 : 1
            }}/>

          <div id="hitbox_overlay" style={{
            opacity: this.props.options.o_hitbox ? 1 : 0
          }}>
            <div id="hitbox_bounds" style={{
              height: target_size,
              width: target_size,
              borderRadius: '50%',
              transition: '0.7s all'
            }}>
              {[1,2,3,4,5,6,7,8,9,10].map((box, i) => {
                return (
                  <div key={i} style={{
                    height: target_size,
                    width: target_size,
                    display: 'flex',
                    position: 'absolute'
                  }}>

                    <div key={i} className="hitbox_area" style={{
                      height: target_size * (box * 0.1),
                      width: target_size * (box * 0.1),
                      borderRadius: '50%'
                    }}>
                    </div>

                  </div>
                  )
                })}
              </div>
          </div>
        </div>
      )
    } else if(backgroundName === 'target_darts') {
      background = (
        <div className="bgImg bg_darts">

          <img 
            src="https://i.imgur.com/l1gmoFL.png" 
            alt="target"            
            style={{
              height: target_size,
              width: target_size,
              transition: '0.7s all',
              opacity: this.props.options.o_target_hidden ? 0 : this.props.options.o_target_opacity ? 0.5 : 1
            }}/>

          <div id="hitbox_overlay" style={{
              opacity: this.props.options.o_hitbox ? 1 : 0
            }}>
              <div id="hitbox_bounds" style={{
                height: target_size - ((target_size / 100) * 24),
                width: target_size - ((target_size / 100) * 24),
                borderRadius: '50%',
                transition: '0.7s all'
              }}>

                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((box, i) => {
                  return (
                    <div key={i} style={{
                      height: target_size - ((target_size / 100) * 24),
                      width: target_size - ((target_size / 100) * 24),
                      display: 'flex',
                      position: 'absolute'
                    }}>
  
                      <div key={i} className="hitbox_area_pie" style={{
                        width: '1px',
                        height: target_size - ((target_size / 100) * 24),
                        borderLeft: '1px solid blue',
                        margin: '0 auto',
                        transform: `rotate(${-9 - (box * 18)}deg)`
                      }}>
                      
                      </div>
  
                    </div>
                  )
                })}

                {[24.5, 28.5, 52, 56, 93, 97].map((box, i) => {
                  return (
                    <div key={i} style={{
                      height: target_size - ((target_size / 100) * 24),
                      width: target_size - ((target_size / 100) * 24),
                      display: 'flex',
                      position: 'absolute'
                    }}>
  
                      <div key={i} className="hitbox_area" style={{
                        height: target_size - ((target_size / 100) * box),
                        width: target_size - ((target_size / 100) * box),
                        borderRadius: '50%'
                      }}>
                      </div>
  
                    </div>
                  )
                })}

              </div>
          </div>
        </div>
        )
    } else if(backgroundName === 'target_player') {
      background = (
        <div className="bgImg bg_player" style={{
          // background: 'url(https://i.imgur.com/eeuOKxo.png)',
          // height: '100%',
          // width: '100%',
          // backgroundPosition: 'center',
          // backgroundSize: 'cover',
          // border: '1px solid red'
          // opacity: this.props.options.o_target_hidden ? 0 : this.props.options.o_target_opacity ? 0.5 : 1
        }}>

           <img 
            src="https://i.imgur.com/ss4KFLm.png" 
            alt="target"            
            style={{
              height: target_size,
              width: target_size,
              transition: '0.7s all',
              opacity: this.props.options.o_target_hidden ? 0 : this.props.options.o_target_opacity ? 0.5 : 1
            }}/>

          <div id="hitbox_overlay" style={{
              opacity: this.props.options.o_hitbox ? 1 : 0
            }}>
            <img 
              alt="target" 
              src="https://i.imgur.com/8mATcsC.png"
              style={{
                height: target_size,
                width: target_size
              }} />
          </div>

        </div>
        )
    } 

    

    return (
      <div className="Background">

        <div 
          id="hitMap">
          {this.props.history.latest.map((shot, key) => {
            return (
              <div 
                key={key} 
                className='hole'
                style={{
                position: 'absolute',
                border: shot.hit ? '1px solid lightgreen' : '1px solid red',
                left: shot.mousePos.x - shot.recoil.x,
                top: shot.mousePos.y - shot.recoil.y
              }}></div>
            )
          })}


          {/* {this.props.history.latest.map((shot, key) => {
            return (
              <div 
                key={key} 
                className='hole'
                style={{
                position: 'absolute',
                height: target_size,
                width: target_size,
                border: '1px solid blue',
                left: shot.topLeft.x,
                top: shot.topLeft.y
              }}></div>
            )
          })} */}
{/* DEBUGGING */}

{/* DEBUGGING */}
{/* {this.props.history.latest.map((shot, key) => {
            return (
              <div 
                key={key} 
                className='hole'
                style={{
                position: 'absolute',
                height: '5px',
                width: '5px',
                border: '1px solid blue',
                left: shot.topLeft.center.x,
                top: shot.topLeft.center.y
              }}></div>
            )
          })} */}
{/* DEBUGGING */}

        </div>

        {background}

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
    targets: state.targets,
    history: state.history,
    options: state.options
  };
}

// these are the 'actions' that get bound to props
// function mapDispatchToProps(dispatch) {
//   // whenever <function below> is called result should be passed
//   // to all of our reducers
//   return bindActionCreators({
//     LayoutChange: LayoutChange
//   }, dispatch);
// }

// to promote monoSwitch from component to container it needs
// to know about these things

export default connect(mapStateToProps)(Background);
// export default Action;