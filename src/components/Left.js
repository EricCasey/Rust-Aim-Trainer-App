import React, {Component} from "react";

// React-Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// React-Redux Actions
import { LayoutChange } from '../rr_actions/rr_a_layoutChange';
import { WeaponChange } from '../rr_actions/rr_a_weaponChange';
import { TargetChange } from '../rr_actions/rr_a_targetChange';
import { OptionChange } from '../rr_actions/rr_a_optionChange';

import WeaponStats from '../weapons.json'

class Left extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let lay = this.props.layout;
    let weapon = Object.keys(WeaponStats)[this.props.weapons.currentWeapon - 1]
    let weaponImg = WeaponStats[weapon].imageInv

    console.log(WeaponStats)
    console.log(this.props)
    return (
      <div
        className="Left"
        style={{
        width: lay.left
          ? '300px'
          : '36px',
        height: 'calc(100% - 36px)',
        top: lay.head
          ? '300px'
          : '38px'
      }}>
        <div id="hoverBox-Left" onClick={this.props.LayoutChange}>></div>
        <div
          id="leftCont"
          style={{
          width: lay.left
            ? '100%'
            : '0%'
        }}>
          <h2
            style={{
            transform: lay.left
              ? 'rotate(0deg)'
              : 'rotate(90deg)',
            margin: lay.left
              ? '0 0 0 0'
              : '60px 0 0 -143px',
            height: lay.left
              ? '35px'
              : '50px'
          }}>SETTINGS</h2>
          <div
            id="leftList"
            style={{
            opacity: lay.left
              ? 1
              : 0
          }}>

            <div className="leftO left_weapons">
              <h5>WEAPONS</h5>
              <div id="weaponSide">
                <div id="weaponPrev" onClick={this.props.WeaponChange}>
                  <p>{"<"}</p>
                </div>
                <div id="weaponCarousel">
                  <img id="weaponSelected" src={weaponImg} alt="weapon" />
                </div>
                <div id="weaponNext" onClick={this.props.WeaponChange}>
                  <p>{">"}</p>
                </div>
              </div>
              <div id="weaponStats">
                <h5>{WeaponStats[weapon].gameName}</h5>
                <div id="weaponGraphCont">
                  <div id="weaponGraphs">
                    <div className="graphCont">
                      <p>Magazine:</p>
                      <p>{WeaponStats[weapon].magSize}</p>
                      <div className="barChart">
                        <div className="bar" style={{
                          width: (WeaponStats[weapon].magSize).toString() + '%'
                        }}></div>
                      </div>
                    </div>
                    <div className="graphCont">
                      <p>Headshot:</p>
                      <p>{WeaponStats[weapon].damage_head}</p>
                      <div className="barChart">
                        <div className="bar" style={{
                          width: ((WeaponStats[weapon].damage_head / 130) * 100).toString() + '%'
                        }}></div>
                      </div>
                    </div>
                    <div className="graphCont">
                      <p>DPS:</p> 
                      <p>{WeaponStats[weapon].DPS}</p>
                      <div className="barChart">
                        <div className="bar" style={{
                          width: ((WeaponStats[weapon].DPS / 335) * 100).toString() + '%'
                        }}></div>
                      </div>
                    </div>
                    <div className="graphCont">
                      <p>Recoil:</p> 
                      <p>{WeaponStats[weapon].avg_dist}</p>
                      <div className="barChart">
                        <div className="bar" style={{
                          width: ((WeaponStats[weapon].avg_dist / 40) * 100).toString() + '%'
                        }}></div>
                      </div>
                    </div>
                    <div className="graphCont">
                      <p>Draw Time:</p> 
                      <p>{WeaponStats[weapon].drawTime}s</p>
                      <div className="barChart">
                        <div className="bar" style={{
                          width: ((WeaponStats[weapon].drawTime / 2) * 100).toString() + '%'
                        }}></div>
                      </div>
                    </div>
                    <div className="graphCont">
                      <p>Reload Time:</p> 
                      <p>{WeaponStats[weapon].reloadTime}s</p>
                      <div className="barChart">
                        <div className="bar" style={{
                          width: ((WeaponStats[weapon].reloadTime / 7.5) * 100).toString() + '%'
                        }}></div>
                      </div>
                    </div>
                  </div>
                  <div id="playerModel">
                    <img alt="target" src="https://i.imgur.com/PHz717q.png"/>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="leftO">
              <h5>MUZZLE ATTACHMENTS</h5>
              <div className="attachmentSelect">

                <div 
                  className="attachmentOption" 
                  id="attach_silencer" 
                  onClick={this.props.WeaponChange} 
                  style={{ border: this.props.weapons.attachMuzzle === 'attach_silencer' ? '1px solid white' : '' }}>
                  <div><p>Silencer</p></div>
                  <div className="optionImgCont">
                    <img className="attachmentImg" alt="atta" src="https://vignette.wikia.nocookie.net/play-rust/images/9/9f/Silencer_icon.png" />
                  </div>
                </div>

                <div 
                  className="attachmentOption" 
                  id="attach_boost" 
                  onClick={this.props.WeaponChange}
                  style={{ border: this.props.weapons.attachMuzzle === 'attach_boost' ? '1px solid white' : '' }}>
                  <div><p>Boost</p></div>
                  <div className="optionImgCont">
                    <img className="attachmentImg" alt="atta" src=" https://vignette.wikia.nocookie.net/play-rust/images/7/7d/Muzzle_Boost_icon.png" />
                  </div>
                </div>

                <div 
                  className="attachmentOption" 
                  id="attach_brake" 
                  onClick={this.props.WeaponChange}
                  style={{ border: this.props.weapons.attachMuzzle === 'attach_brake' ? '1px solid white' : '' }}>
                  <div><p>Brake</p></div>
                  <div className="optionImgCont">
                    <img className="attachmentImg" alt="atta" src="https://vignette.wikia.nocookie.net/play-rust/images/3/38/Muzzle_Brake_icon.png" />
                  </div>
                </div>

              </div>
            </div> */}

            <div className="leftO">

              <h5>TARGET</h5>

              <div className="targetSelect">

                <div 
                  className="targetOption" 
                  id="target_archery" 
                  onClick={this.props.TargetChange}
                  style={{ border: this.props.targets.currentTarget === 'target_archery' ? '1px solid white' : '' }}>
                  <div><p>Archery</p></div>
                  <div className="optionImgCont">
                    <img className="targetImg" id="target_archery" src="https://i.imgur.com/RNmXrAh.png" alt="targetImg"/>
                  </div>
                </div>

                <div 
                  className="targetOption" 
                  id="target_darts" 
                  onClick={this.props.TargetChange}
                  style={{ border: this.props.targets.currentTarget === 'target_darts' ? '1px solid white' : '' }}>
                  <div><p>Darts</p></div>
                  <div className="optionImgCont">
                    <img className="targetImg" id="target_darts" src="https://i.imgur.com/RD8iWp9.png" alt="targetImg"/>
                  </div>
                </div>

                <div 
                  className="targetOption" 
                  id="target_player" 
                  onClick={this.props.TargetChange}
                  style={{ border: this.props.targets.currentTarget === 'target_player' ? '1px solid white' : '' }}>
                  <div><p>Player</p></div>
                  <div className="optionImgCont">
                    <img className="targetImg" id="target_player"src="https://i.imgur.com/FezF7Oa.png" alt="targetImg"/>
                  </div>
                </div>

              </div>
            </div>

            <div className="leftO">
              <h5>RANGE</h5>
              <div className="rangeSelect">
                {/* <div className="rangeOption" id="range_lo">Close</div>
                <div className="rangeOption" id="range_mi">Mid</div>
                <div className="rangeOption" id="range_hi">Long</div> */}


                <div 
                  className="rangeOption" 
                  id="range_lo" 
                  onClick={this.props.TargetChange}
                  style={{ border: this.props.targets.range === 'lo' ? '1px solid white' : '' }}>
                  <div><p>Close</p></div>
                  <div className="optionImgCont">
                    <img className="targetImg" id="range_lo" src="https://i.imgur.com/zSpKhe0.png" alt="targetImg"/>
                  </div>
                </div>

                <div 
                  className="rangeOption" 
                  id="range_mi" 
                  onClick={this.props.TargetChange}
                  style={{ border: this.props.targets.range === 'mi' ? '1px solid white' : '' }}>
                  <div><p>Mid</p></div>
                  <div className="optionImgCont">
                    <img className="targetImg" id="range_mi" src="https://i.imgur.com/MCwQUd7.png" alt="targetImg"/>
                  </div>
                </div>

                <div 
                  className="rangeOption" 
                  id="range_hi" 
                  onClick={this.props.TargetChange}
                  style={{ border: this.props.targets.range === 'hi' ? '1px solid white' : '' }}>
                  <div><p>Long</p></div>
                  <div className="optionImgCont">
                    <img className="targetImg" id="range_hi" src="https://i.imgur.com/nrK2mZg.png" alt="targetImg"/>
                  </div>
                </div>

              </div>
            </div>

            <div className="leftO left_uioptions">
              <h5>UI OPTIONS</h5>
              <div className="optionSelect">
                <div 
                  className="optionOption" 
                  id="o_snake" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_snake"] ? '1px solid white' : '' }}>
                  <p>Spray Snake</p>
                </div>
                <div 
                  className="optionOption" 
                  id="o_guide" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_guide"] ? '1px solid white' : '' }}>
                  <p>Spray Guide</p>
                </div>
                <div 
                  className="optionOption" 
                  id="o_hitbox" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_hitbox"] ? '1px solid white' : '' }}>
                  <p>Hitboxes</p>
                </div>
                <div 
                  className="optionOption" 
                  id="o_silhouette" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_silhouette"] ? '1px solid white' : '' }}>
                  <p>Silhouette</p>
                </div>
                <div 
                  className="optionOption" 
                  id="o_crosshair" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_crosshair"] ? '1px solid white' : '' }}>
                  <p>Crosshair</p>
                </div>
                <div 
                  className="optionOption" 
                  id="o_reddot" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_reddot"] ? '1px solid white' : '' }}>
                  <p>Red Dot</p>
                </div>
                <div 
                  className="optionOption" 
                  id="o_weapon" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_weapon"] ? '1px solid white' : '' }}>
                  <p>Hide Weapon</p>
                </div>
                <div 
                  className="optionOption" 
                  id="o_opacity" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_opacity"] ? '1px solid white' : '' }}>
                  <p>Weapon Opacity</p>
                </div>
                <div 
                  className="optionOption" 
                  id="o_target_hidden" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_target_hidden"] ? '1px solid white' : '' }}>
                  <p>Hide Target</p>
                </div>
                <div 
                  className="optionOption" 
                  id="o_target_opacity" 
                  onClick={this.props.OptionChange}
                  style={{ border: this.props.options["o_target_opacity"] ? '1px solid white' : '' }}>
                  <p>Target Opacity</p>
                </div>
              </div>
            </div>

            {/* return {
          o_snake: true,
          o_guide: true,
          o_hitbox: true,
          o_opacity: true,
          o_weapon: true,
          o_silhouette: true,
          o_crosshair: true,
          o_reddot: true,
          o_fireRate: 0,
          o_randomness: 0
        } */}

            <div className="leftO left_firerate">
              <h5>FIRE RATE</h5>
              <div>
                <input onChange={this.props.OptionChange} value={this.props.options.o_fireRate} type="range" id="o_fireRate" name="points" min="25" max="500"/>
                <p>{this.props.options.o_fireRate}%</p>
              </div>
            </div>

            <div className="leftO left_randomness">
              <h5>RANDOMNESS</h5>
              <div>
                <input onChange={this.props.OptionChange} value={this.props.options.o_randomness} type="range" id="o_randomness" name="points" min="0" max="25"/>
                <p>{this.props.options.o_randomness}px</p>
              </div>
            </div>

            {/* <div className="leftO">
              <h5>Sounds</h5>
              <div>as a %</div>
            </div> */}

          </div>
        </div>
      </div>
      ); } }; // this is the 'data' that gets bound to props function let
      function mapStateToProps(state) {// whatever gets returned will show up as props inside of dispatch fun
      return {
        theme: state.theme, 
        layout: state.layout,
        weapons: state.weapons,
        targets: state.targets,
        options: state.options
      };
}

      // these are the 'actions' that get bound to props function let
      function mapDispatchToProps(dispatch) {// whenever <function below> is called result should be passed to all of our
      // reducers
      return bindActionCreators({
        LayoutChange: LayoutChange,
        WeaponChange: WeaponChange,
        TargetChange: TargetChange,
        OptionChange: OptionChange
      }, dispatch);
}

// to promote monoSwitch from component to container it needs
// to know about these things

export default connect(mapStateToProps, mapDispatchToProps)(Left);
// export default App;