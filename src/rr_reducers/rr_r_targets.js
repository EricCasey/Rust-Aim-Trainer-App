// state argument isn't app state, only the state this reducer is
// responsible for.

export default function(state = null, action) {
    switch (action.type) {
      case 'WEAPON_CHANGE':
        return state
      case 'FIRE_WEAPON':
        return state
      case 'LAYOUT_CHANGE':
        return state
      case 'OPTION_CHANGE':
        return state

      case 'TARGET_CHANGE':
        // console.log("target change! do something here")
        // console.log(action.payload.target.id)
        let targetType = ''

        if(action.payload.target.id.split("_")[0] === 'target') {
          targetType = action.payload.target.id.split("_")[1]
          let moving = state.moving ? 'moving' : 'static'
          let logName = 'target_' + moving + '_' + targetType
  
          return {
            currentTarget: action.payload.target.id,
            logName: logName,
            range: state.range,
            moving: state.moving
          }
        } else if(action.payload.target.id.split("_")[0] === 'range') {
          // console.log("range change!")
          return {
            range: action.payload.target.id.split("_")[1],
            currentTarget: state.currentTarget,
            moving: state.moving,
            logName: state.logName
          }
        }

      break; 

      case '@@redux/INIT':
        return {
          currentTarget: 'target_darts',
          logName: 'target_static_archery',
          range: 'lo',
          moving: false
        }
      default:
        return {
          currentTarget: 'target_darts',
          logName: 'target_static_archery',
          range: 'lo',
          moving: false
        }
    }
  }