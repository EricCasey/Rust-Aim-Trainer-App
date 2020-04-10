// state argument isn't app state, only the state this reducer is
// responsible for.

export default function(state = null, action) {
    switch (action.type) {
      case 'LAYOUT_CHANGE':
        return state
      case 'TARGET_CHANGE':
        return state
      case 'FIRE_WEAPON':
        return state
      case 'OPTION_CHANGE':
        return state


      case 'WEAPON_CHANGE':
        console.log("WEAPON_CHANGE", action.payload.target.id)
        console.log(state)

        if(action.payload.target.id === 'weaponPrev') {
          if(state.currentWeapon === 1) {
            return {
              currentWeapon: 6,
              attachMuzzle: state.attachMuzzle
            }
          } else {
            return {
              currentWeapon: state.currentWeapon - 1,
              attachMuzzle: state.attachMuzzle
            }
          }
        } else if (action.payload.target.id === 'weaponNext') {
          if(state.currentWeapon === 6) {
            return {
              currentWeapon: 1,
              attachMuzzle: state.attachMuzzle
            }
          } else {
            return {
              currentWeapon: state.currentWeapon + 1,
              attachMuzzle: state.attachMuzzle
            }
          }
        } else if (action.payload.target.id.split("_")[0] === 'attach') {
          console.log("attachment change")
        // attach_silencer
          if(state.attachMuzzle === action.payload.target.id) {
            console.log("dequip")
            return {
              currentWeapon: state.currentWeapon,
              attachMuzzle: ''
            }
          } else {
            console.log("equip")
            return {
              currentWeapon: state.currentWeapon,
              attachMuzzle: action.payload.target.id
            }
          }
        } else {
          console.log("something else, returning default")
          return {
            currentWeapon: 1,
            attachMuzzle: state.attachMuzzle
          }
        }
      
      

      case '@@redux/INIT':
        return {
          currentWeapon: 1,
          attachMuzzle: ''
        }
      default:
        return {
          currentWeapon: 1,
          attachMuzzle: ''
        }
    }
  }