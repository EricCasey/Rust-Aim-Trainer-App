// state argument isn't app state, only the state this reducer is
// responsible for.

export default function(state = null, action) {
    switch (action.type) {
      case 'WEAPON_CHANGE':
        return state
      case "TARGET_CHANGE":
        return state
      case 'LAYOUT_CHANGE':
        return state
      case 'FIRE_WEAPON':
        return state
      
      case 'OPTION_CHANGE':
        // console.log("OPTION CHANGE")
        // console.log(action.payload.target.id)
        let update = state

        if(action.payload.target.id === 'o_fireRate' || action.payload.target.id === 'o_randomness') {
          update[action.payload.target.id] = action.payload.target.value
        } else {
          update[action.payload.target.id] = state[action.payload.target.id] ? false : true
        }


        return {
          update,
          ...state
        }

      case '@@redux/INIT':
        return {
          o_snake: false,
          o_guide: false,
          o_hitbox: false,
          o_opacity: false,
          o_weapon: false,
          o_silhouette: false,
          o_crosshair: false,
          o_reddot: false,
          o_target_opacity: false,
          o_target_hidden: false,
          o_fireRate: 100,
          o_randomness: 0
        }
      default:
        return {
          o_snake: false,
          o_guide: false,
          o_hitbox: false,
          o_opacity: false,
          o_weapon: false,
          o_silhouette: false,
          o_crosshair: false,
          o_reddot: false,
          o_target_opacity: false,
          o_target_hidden: false,
          o_fireRate: 100,
          o_randomness: 0
        }
    }
  }